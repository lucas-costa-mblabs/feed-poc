import React from "react";
import ComponentRenderer from "../ComponentRenderer";
import type { ComponentNode } from "../../types";
import { theme } from "../../theme";

interface CanvasAreaProps {
  showGuides: boolean;
  setShowGuides: (show: boolean) => void;
  components: ComponentNode[];
  selectedNodeId: string | null;
  isDragOver: boolean;
  dragOverNodeId: string | null;
  dragPosition: "top" | "bottom" | "inside" | null;
  onSelectNode: (id: string | null) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStartNode: (e: React.DragEvent, id: string) => void;
  onDragOverNode: (e: React.DragEvent, id: string) => void;
  onDragLeaveNode: (e: React.DragEvent, id: string) => void;
  onDropNode: (e: React.DragEvent, id: string) => void;
  onClearCanvas: () => void;
  onSave?: () => void;
  templateName?: string;
  onRenameTemplate?: (name: string) => void;
  children?: React.ReactNode;
}

export default function CanvasArea({
  showGuides,
  setShowGuides,
  components,
  selectedNodeId,
  isDragOver,
  dragOverNodeId,
  dragPosition,
  onSelectNode,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragStartNode,
  onDragOverNode,
  onDragLeaveNode,
  onDropNode,
  onClearCanvas,
  onSave,
  templateName,
  onRenameTemplate,
  children,
}: CanvasAreaProps) {
  const [zoom, setZoom] = React.useState(0.8);
  const [showCode, setShowCode] = React.useState(false);
  const [editingName, setEditingName] = React.useState(false);
  const [nameDraft, setNameDraft] = React.useState(templateName ?? "");
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setNameDraft(templateName ?? "");
  }, [templateName]);

  const startEditName = () => {
    setNameDraft(templateName ?? "");
    setEditingName(true);
    setTimeout(() => { nameInputRef.current?.focus(); nameInputRef.current?.select(); }, 0);
  };

  const commitName = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== templateName) onRenameTemplate?.(trimmed);
    setEditingName(false);
  };

  const onNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitName();
    if (e.key === "Escape") setEditingName(false);
  };

  const handlePreview = () => {
    localStorage.setItem("builder-components", JSON.stringify(components));
    window.open("/preview", "_blank");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Código copiado!");
  };

  const generatedCode = JSON.stringify({ template: components, theme }, null, 2);

  return (
    <main className="builder-canvas-area">
      <header className="canvas-header">
        <div className="canvas-header-left" style={{ gap: "8px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(e) => setShowGuides(e.target.checked)}
            />
            Show Guides
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "#1e293b",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            <button
              onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "1rem",
                padding: "4px",
              }}
            >
              -
            </button>
            <span
              style={{
                minWidth: "45px",
                textAlign: "center",
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "white",
                fontSize: "1rem",
                padding: "4px",
              }}
            >
              +
            </button>
          </div>

          <button
            className="top-bar-btn"
            style={{ backgroundColor: "#64748b", padding: "6px 10px" }}
            onClick={() => setZoom(0.8)}
          >
            Reset
          </button>

          <button
            className="top-bar-btn"
            style={{ backgroundColor: "#ef4444", padding: "6px 10px" }}
            onClick={onClearCanvas}
          >
            Clear
          </button>
        </div>

        {templateName !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center" }}>
            {editingName ? (
              <input
                ref={nameInputRef}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                onBlur={commitName}
                onKeyDown={onNameKeyDown}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 4,
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  padding: "3px 8px",
                  outline: "none",
                  minWidth: 180,
                  textAlign: "center",
                }}
              />
            ) : (
              <button
                onClick={startEditName}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 8px",
                  borderRadius: 4,
                  opacity: 0.85,
                }}
                title="Renomear template"
              >
                {templateName}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.7 }}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="canvas-header-right" style={{ gap: "8px" }}>
          <button
            className="top-bar-btn"
            style={{ backgroundColor: "#475569" }}
            onClick={() => setShowCode(true)}
          >
            Show Code
          </button>
          <button
            className="top-bar-btn"
            style={{ backgroundColor: "#3b82f6" }}
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="top-bar-btn"
            style={{ backgroundColor: "#10b981" }}
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </header>

      <div className="canvas-wrapper" style={{ position: "relative" }}>
        {children}
        <div
          className={`canvas-page format-portrait ${showGuides ? "show-guides" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
          }}
        >
          <div className="post-guidelines">
            <div className="safe-zone" title="Safe Zone for Text & Logos"></div>
          </div>

          <div
            style={{
              zIndex: 10,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "0" /* Real post shouldn't have arbitrary gaps */,
              height: "100%",
            }}
          >
            {components.map((node) => (
              <ComponentRenderer
                key={node.id}
                node={node}
                selectedNodeId={selectedNodeId}
                dragOverNodeId={dragOverNodeId}
                dragPosition={dragPosition}
                onSelect={onSelectNode}
                onDragStartNode={onDragStartNode}
                onDragOverNode={onDragOverNode}
                onDragLeaveNode={onDragLeaveNode}
                onDropNode={onDropNode}
              />
            ))}

            {components.length === 0 && (
              <div
                className="empty-canvas-state"
                style={{
                  border: isDragOver
                    ? "2px dashed #d81b60"
                    : "2px dashed transparent",
                  backgroundColor: isDragOver
                    ? "rgba(216, 27, 96, 0.05)"
                    : "rgba(0,0,0,0.02)",
                  flex: 1,
                }}
              >
                <div className="plus-icon">+</div>
                <span>Drag widget here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Viewer Modal */}
      {showCode && (
        <div className="modal-overlay" onClick={() => setShowCode(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span style={{ fontWeight: 700 }}>Generated Template (JSON)</span>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(generatedCode)}
                >
                  Copy Code
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={() => setShowCode(false)}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="modal-body">
              <pre className="code-block">{generatedCode}</pre>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
