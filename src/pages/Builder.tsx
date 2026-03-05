import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ComponentNode } from "../types";
import { generateId } from "../types";

import Sidebar from "../components/builder/Sidebar";
import CanvasArea from "../components/builder/CanvasArea";
import PropertiesPopup from "../components/builder/PropertiesPopup";
import { dermageProductTemplate } from "../templates/dermageTemplate";
import { upsertTemplateEntry, getTemplatesIndex } from "../pages/Dashboard";

export default function Builder() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // If id is "new", generate a unique id and redirect so each new template is independent
  useEffect(() => {
    if (id === "new") {
      const newId = `template-${Date.now()}`;
      navigate(`/builder/${newId}`, { replace: true });
    }
  }, [id, navigate]);

  const storageKey = `builder-canvas-data-${id}`;

  const getInitialComponents = (): ComponentNode[] => {
    if (!id || id === "new") return [];
    const saved = localStorage.getItem(`builder-canvas-data-${id}`);
    if (saved) return JSON.parse(saved);
    if (id === "dermage") return dermageProductTemplate;
    return [];
  };

  const getInitialName = () => {
    if (!id || id === "new") return "";
    const existing = getTemplatesIndex().find((e) => e.id === id);
    return (
      existing?.name ??
      (id === "dermage"
        ? "Template Dermage"
        : `Template ${id.replace("template-", "#")}`)
    );
  };

  const [templateName, setTemplateName] = useState<string>(getInitialName);

  useEffect(() => {
    if (!id || id === "new") return;
    setTemplateName(getInitialName());
  }, [id]);

  const handleRenameTemplate = (newName: string) => {
    const existing = getTemplatesIndex().find((e) => e.id === id);
    if (existing) {
      upsertTemplateEntry({ ...existing, name: newName });
    }
    setTemplateName(newName);
  };

  const [showGuides, setShowGuides] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [components, setComponents] =
    useState<ComponentNode[]>(getInitialComponents);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Reset canvas when navigating to a different template
  useEffect(() => {
    if (!id || id === "new") return;
    setComponents(getInitialComponents());
    setSelectedNodeId(null);
  }, [id]);

  // History State for Undo/Redo
  const [history, setHistory] = useState<ComponentNode[][]>(() => [
    getInitialComponents(),
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Drag visual feedback state
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<
    "top" | "bottom" | "inside" | null
  >(null);

  // Wrapper for setComponents that pushes to history
  // Accepts either a new array or an updater callback
  const handleSetComponents = (
    action: React.SetStateAction<ComponentNode[]>,
  ) => {
    setComponents((prev) => {
      // Determine the new state safely
      const newState = typeof action === "function" ? action(prev) : action;

      setHistory((prevHistory) => {
        // Remove future history if we undo'd and are now doing a new action
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push(newState);

        // Keep a reasonable limit, e.g., 50 steps
        if (newHistory.length > 50) {
          newHistory.shift();
        } else {
          setHistoryIndex(newHistory.length - 1);
        }
        return newHistory;
      });

      return newState;
    });
  };

  // Helper function to recursively find and update a node
  const updateNodeInTree = (
    nodes: ComponentNode[],
    id: string,
    updates: Partial<ComponentNode>,
  ): ComponentNode[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, ...updates } as ComponentNode;
      }
      if ("blocks" in node && node.blocks) {
        return {
          ...node,
          blocks: updateNodeInTree(node.blocks, id, updates),
        } as ComponentNode;
      }
      return node;
    });
  };

  const handleUpdateNode = (id: string, updates: Partial<ComponentNode>) => {
    handleSetComponents((prev) => updateNodeInTree(prev, id, updates));
  };

  const deleteNodeFromTree = (
    nodes: ComponentNode[],
    id: string,
  ): ComponentNode[] => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if ("blocks" in node && node.blocks) {
          return {
            ...node,
            blocks: deleteNodeFromTree(node.blocks, id),
          } as ComponentNode;
        }
        return node;
      });
  };

  // Switch back to Elements tab if currently on Properties
  const handleSelectNode = (id: string | null) => {
    setSelectedNodeId(id);
  };

  const getSelectedNode = (
    nodes: ComponentNode[],
    id: string,
  ): ComponentNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if ("blocks" in node && node.blocks) {
        const found = getSelectedNode(node.blocks, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedNode = selectedNodeId
    ? getSelectedNode(components, selectedNodeId)
    : null;

  // Handle keyboard events (delete node)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedNodeId) return;

      const target = e.target as HTMLElement;
      // Do not trigger delete if typing inside an input, text area, or select
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleSetComponents((prev) => deleteNodeFromTree(prev, selectedNodeId));
        handleSelectNode(null); // Clear selection
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId]);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(components));
    const existing = getTemplatesIndex().find((e) => e.id === id);
    const defaultName =
      id === "dermage"
        ? "Template Dermage"
        : `Template ${id!.replace("template-", "#")}`;
    upsertTemplateEntry({
      id: id!,
      name: existing?.name ?? defaultName,
      updatedAt: new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    });
    alert("Layout salvo com sucesso! ✅");
  };

  // Handle Command+Z (Undo) and Command+Shift+Z (Redo)
  useEffect(() => {
    const handleUndoRedo = (e: KeyboardEvent) => {
      // Target check to prevent undoing while typing text inside inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          // Redo
          if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            setHistoryIndex(nextIndex);
            setComponents(history[nextIndex]);
          }
        } else {
          // Undo
          if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            setHistoryIndex(prevIndex);
            setComponents(history[prevIndex]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleUndoRedo);
    return () => window.removeEventListener("keydown", handleUndoRedo);
  }, [history, historyIndex]);

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDragStartNode = (e: React.DragEvent, id: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("draggedNodeId", id);
  };

  const handleDragOverNode = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const y = e.clientY - rect.top;

    // Get the node to check its type
    const node = getSelectedNode(components, id);
    const isContainer = node && node.type === "container";

    let position: "top" | "bottom" | "inside" = "inside";

    if (isContainer) {
      // For containers, use 25% threshold for top/bottom, 50% for middle (inside)
      const threshold = rect.height * 0.25;
      if (y < threshold) {
        position = "top";
      } else if (y > rect.height - threshold) {
        position = "bottom";
      } else {
        position = "inside";
      }
    } else {
      // For non-containers, just top/bottom split
      if (y < rect.height / 2) {
        position = "top";
      } else {
        position = "bottom";
      }
    }

    setDragOverNodeId(id);
    setDragPosition(position);
  };

  const handleDragLeaveNode = (e: React.DragEvent, _id: string) => {
    e.stopPropagation();
    setDragOverNodeId(null);
    setDragPosition(null);
  };

  const isDescendant = (parentId: string, targetId: string): boolean => {
    const parentNode = getSelectedNode(components, parentId);
    if (!parentNode) return false;
    // Check if targetId is inside parentNode
    if (parentId === targetId) return true;
    if ("blocks" in parentNode && parentNode.blocks) {
      return !!getSelectedNode(parentNode.blocks, targetId);
    }
    return false;
  };

  const moveNode = (sourceId: string, targetId: string) => {
    if (sourceId === targetId || isDescendant(sourceId, targetId)) return;

    const sourceNode = getSelectedNode(components, sourceId);
    if (!sourceNode) return;

    let newComponents = deleteNodeFromTree(components, sourceId);

    if (targetId === "canvas") {
      handleSetComponents([...newComponents, sourceNode]);
      return;
    }

    const insertNode = (nodes: ComponentNode[]): ComponentNode[] => {
      let result: ComponentNode[] = [];
      for (const node of nodes) {
        if (node.id === targetId) {
          if (dragPosition === "inside" && node.type === "container") {
            result.push({
              ...node,
              blocks: [...(node.blocks || []), sourceNode],
            } as ComponentNode);
          } else if (dragPosition === "top") {
            result.push(sourceNode);
            result.push(node);
          } else {
            // bottom
            result.push(node);
            result.push(sourceNode);
          }
        } else if ("blocks" in node && node.blocks) {
          result.push({
            ...node,
            blocks: insertNode(node.blocks),
          } as ComponentNode);
        } else {
          result.push(node);
        }
      }
      return result;
    };

    handleSetComponents(insertNode(newComponents));
  };

  const handleDropNode = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    setDragOverNodeId(null);
    setDragPosition(null);

    const draggedNodeId = e.dataTransfer.getData("draggedNodeId");
    const componentType = e.dataTransfer.getData("componentType");

    if (draggedNodeId) {
      moveNode(draggedNodeId, id);
    } else if (componentType) {
      const newNode = createDefaultNode(componentType);

      const insertNewNode = (nodes: ComponentNode[]): ComponentNode[] => {
        let result: ComponentNode[] = [];
        for (const node of nodes) {
          if (node.id === id) {
            if (dragPosition === "inside" && node.type === "container") {
              result.push({
                ...node,
                blocks: [...(node.blocks || []), newNode],
              } as ComponentNode);
            } else if (dragPosition === "top") {
              result.push(newNode);
              result.push(node);
            } else {
              result.push(node);
              result.push(newNode);
            }
          } else if ("blocks" in node && node.blocks) {
            result.push({
              ...node,
              blocks: insertNewNode(node.blocks),
            } as ComponentNode);
          } else {
            result.push(node);
          }
        }
        return result;
      };

      handleSetComponents(insertNewNode(components));
      setSelectedNodeId(newNode.id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const draggedNodeId = e.dataTransfer.getData("draggedNodeId");
    const type = e.dataTransfer.getData("componentType");

    if (draggedNodeId) {
      moveNode(draggedNodeId, "canvas");
    } else if (type) {
      const newNode = createDefaultNode(type);
      handleSetComponents([...components, newNode]);
    }
  };

  const createDefaultNode = (type: string): ComponentNode => {
    const base = { id: generateId(), type };
    switch (type) {
      case "container":
        return {
          ...base,
          blocks: [],
          direction: "column",
          paddingX: "md",
          paddingY: "md",
        } as any;

      case "price":
        return {
          ...base,
          price: "R$ 99,90",
          originalPrice: "R$ 149,90",
          discountPercent: "33",
          showOriginalPrice: true,
          showDiscountPercent: true,
        } as any;
      case "text":
        return {
          ...base,
          value: "Novo Texto",
          typography: "body",
          color: "gray-900",
        } as any;
      case "media":
        return {
          ...base,
          url: "",
          alt: "Mídia",
          width: "100%",
          height: "200px",
        } as any;
      case "icon":
        return {
          ...base,
          icon: "star",
          size: 24,
          padding: "xs",
          backgroundColor: undefined,
          borderRadius: "full",
        } as any;
      case "button":
        return {
          ...base,
          label: "Clique Aqui",
          variant: "primary",
          radius: "md",
        } as any;
      case "post_interactions":
        return {
          ...base,
          showLike: true,
          showSave: true,
          showShare: true,
        } as any;
      default:
        return base as any;
    }
  };

  return (
    <div
      id="app"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      onClick={() => handleSelectNode(null)}
    >
      <Sidebar onDragStart={handleDragStart} onBack={() => navigate("/")} />

      <CanvasArea
        showGuides={showGuides}
        setShowGuides={setShowGuides}
        components={components}
        selectedNodeId={selectedNodeId}
        isDragOver={isDragOver}
        dragOverNodeId={dragOverNodeId}
        dragPosition={dragPosition}
        onSelectNode={handleSelectNode}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDragStartNode={handleDragStartNode}
        onDragOverNode={handleDragOverNode}
        onDragLeaveNode={handleDragLeaveNode}
        onDropNode={handleDropNode}
        onSave={handleSave}
        templateName={templateName}
        onRenameTemplate={handleRenameTemplate}
      >
        {selectedNode && (
          <PropertiesPopup
            selectedNode={selectedNode}
            onUpdateNode={handleUpdateNode}
            onClose={() => handleSelectNode(null)}
          />
        )}
      </CanvasArea>
    </div>
  );
}
