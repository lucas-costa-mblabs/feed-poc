import { useState, useRef, useEffect } from "react";
import type { ComponentNode } from "../../types";

const DYNAMIC_TAGS = [
  { label: "Product Title", value: "{{post.title}}" },
  { label: "Product Price", value: "{{post.price}}" },
  { label: "Original Price", value: "{{post.originalPrice}}" },
  { label: "Discount %", value: "{{post.discount}}" },
  { label: "Description", value: "{{post.description}}" },
  { label: "Image URL", value: "{{post.url}}" },
  { label: "Shop Name", value: "{{post.shop.name}}" },
  { label: "Shop Avatar", value: "{{post.shop.avatar}}" },
  { label: "Link URL", value: "{{post.destinationUrl}}" },
];

interface DynamicFieldProps {
  label: string;
  value: string;
  fieldKey: string;
  selectedNode: ComponentNode;
  onUpdateNode: (id: string, updates: Partial<ComponentNode>) => void;
  activeDynamicField: string | null;
  setActiveDynamicField: (val: string | null) => void;
  dynamicPopupRef: React.RefObject<HTMLDivElement | null>;
}

// Move outside to avoid re-mounting on parent render
const DynamicField = ({
  label,
  value,
  fieldKey,
  selectedNode,
  onUpdateNode,
  activeDynamicField,
  setActiveDynamicField,
  dynamicPopupRef,
}: DynamicFieldProps) => (
  <div
    ref={activeDynamicField === fieldKey ? dynamicPopupRef : null}
    style={{ marginBottom: "12px", position: "relative" }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <label style={{ marginBottom: "4px" }}>{label}</label>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setActiveDynamicField(
            activeDynamicField === fieldKey ? null : fieldKey,
          );
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          color: "var(--primary-color)",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "2px",
        }}
        title="Dynamic Tags"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 4.69 2 8s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zm0 10c-4.41 0-8-1.79-8-4s3.59-4 8-4 8 1.79 8 4-3.59 4-8 4zm0 4c-5.52 0-10 2.69-10 6s4.48 6 10 6 10-2.69 10-6-4.48-6-10-6zm0 10c-4.41 0-8-1.79-8-4s3.59-4 8-4 8 1.79 8 4-3.59 4-8 4z" />
        </svg>
        Dynamic
      </button>
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) =>
        onUpdateNode(selectedNode.id, { [fieldKey]: e.target.value })
      }
    />
    {activeDynamicField === fieldKey && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          background: "var(--bg-panel)",
          border: "1px solid var(--border-color)",
          borderRadius: "4px",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
          zIndex: 100,
          width: "160px",
          marginTop: "4px",
          overflow: "hidden",
        }}
      >
        {DYNAMIC_TAGS.map((tag) => (
          <div
            key={tag.value}
            onClick={() => {
              onUpdateNode(selectedNode.id, {
                [fieldKey]: value + tag.value,
              });
              setActiveDynamicField(null);
            }}
            style={{
              padding: "8px 12px",
              fontSize: "12px",
              cursor: "pointer",
              borderBottom: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
            className="dynamic-tag-item"
          >
            {tag.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

interface PropertiesPopupProps {
  selectedNode: ComponentNode;
  onUpdateNode: (id: string, updates: Partial<ComponentNode>) => void;
  onClose: () => void;
}

export default function PropertiesPopup({
  selectedNode,
  onUpdateNode,
  onClose,
}: PropertiesPopupProps) {
  const [activeDynamicField, setActiveDynamicField] = useState<string | null>(
    null,
  );
  const dynamicPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dynamicPopupRef.current &&
        !dynamicPopupRef.current.contains(event.target as Node)
      ) {
        setActiveDynamicField(null);
      }
    }

    if (activeDynamicField) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDynamicField]);

  return (
    <div
      className="floating-properties-popup"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popup-header">
        <span>Edit {selectedNode.type}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2rem",
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>

      <div className="properties-panel">
        {/* Container Properties */}
        {selectedNode.type === "container" && (
          <>
            <label>Direction</label>
            <select
              value={(selectedNode as any).direction || "column"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  direction: e.target.value as any,
                })
              }
            >
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              <div>
                <label>Justify</label>
                <select
                  value={(selectedNode as any).justifyContent || "flex-start"}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      justifyContent: e.target.value as any,
                    })
                  }
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="space-between">Space Between</option>
                  <option value="flex-end">End</option>
                </select>
              </div>
              <div>
                <label>Align</label>
                <select
                  value={(selectedNode as any).alignItems || "stretch"}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      alignItems: e.target.value as any,
                    })
                  }
                >
                  <option value="stretch">Stretch</option>
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                </select>
              </div>
            </div>

            <label>Gap</label>
            <select
              value={(selectedNode as any).gap || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  gap: (e.target.value || undefined) as any,
                })
              }
            >
              <option value="">None</option>
              <option value="xs">xs (4px)</option>
              <option value="sm">sm (8px)</option>
              <option value="md">md (16px)</option>
              <option value="lg">lg (24px)</option>
            </select>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              <div>
                <label>Padding X</label>
                <select
                  value={(selectedNode as any).paddingX || ""}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      paddingX: (e.target.value || undefined) as any,
                    })
                  }
                >
                  <option value="">None</option>
                  <option value="xs">xs (4px)</option>
                  <option value="sm">sm (8px)</option>
                  <option value="md">md (16px)</option>
                  <option value="lg">lg (24px)</option>
                  <option value="xl">xl (32px)</option>
                </select>
              </div>
              <div>
                <label>Padding Y</label>
                <select
                  value={(selectedNode as any).paddingY || ""}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      paddingY: (e.target.value || undefined) as any,
                    })
                  }
                >
                  <option value="">None</option>
                  <option value="xs">xs (4px)</option>
                  <option value="sm">sm (8px)</option>
                  <option value="md">md (16px)</option>
                  <option value="lg">lg (24px)</option>
                  <option value="xl">xl (32px)</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <div>
                <label>Margin X</label>
                <select
                  value={(selectedNode as any).marginX || ""}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      marginX: (e.target.value || undefined) as any,
                    })
                  }
                >
                  <option value="">None</option>
                  <option value="xs">xs (4px)</option>
                  <option value="sm">sm (8px)</option>
                  <option value="md">md (16px)</option>
                  <option value="lg">lg (24px)</option>
                  <option value="xl">xl (32px)</option>
                </select>
              </div>
              <div>
                <label>Margin Y</label>
                <select
                  value={(selectedNode as any).marginY || ""}
                  onChange={(e) =>
                    onUpdateNode(selectedNode.id, {
                      marginY: (e.target.value || undefined) as any,
                    })
                  }
                >
                  <option value="">None</option>
                  <option value="xs">xs (4px)</option>
                  <option value="sm">sm (8px)</option>
                  <option value="md">md (16px)</option>
                  <option value="lg">lg (24px)</option>
                  <option value="xl">xl (32px)</option>
                </select>
              </div>
            </div>

            <label>Background Color</label>
            <select
              value={(selectedNode as any).backgroundColor || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  backgroundColor: e.target.value as any,
                })
              }
            >
              <option value="">None</option>
              <option value="white">white</option>
              <option value="gray-100">gray-100</option>
              <option value="gray-200">gray-200</option>
              <option value="gray-800">gray-800</option>
              <option value="gray-900">gray-900</option>
              <option value="primary">primary</option>
            </select>

            <label>Border Radius</label>
            <select
              value={(selectedNode as any).borderRadius || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  borderRadius: e.target.value as any,
                })
              }
            >
              <option value="">None</option>
              <option value="sm">sm (4px)</option>
              <option value="md">md (8px)</option>
              <option value="lg">lg (16px)</option>
              <option value="full">full (circular)</option>
            </select>
          </>
        )}

        {/* Text specific properties */}
        {selectedNode.type === "text" && (
          <>
            <DynamicField
              label="Value"
              value={(selectedNode as any).value || ""}
              fieldKey="value"
              selectedNode={selectedNode}
              onUpdateNode={onUpdateNode}
              activeDynamicField={activeDynamicField}
              setActiveDynamicField={setActiveDynamicField}
              dynamicPopupRef={dynamicPopupRef}
            />

            <label>Typography</label>
            <select
              value={(selectedNode as any).typography || "body"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  typography: e.target.value as any,
                })
              }
            >
              <option value="body">Body</option>
              <option value="caption">Caption</option>
              <option value="heading1">Heading 1</option>
              <option value="heading2">Heading 2</option>
              <option value="heading3">Heading 3</option>
              <option value="heading4">Heading 4</option>
              <option value="heading5">Heading 5</option>
            </select>

            <label>Color Token</label>
            <select
              value={(selectedNode as any).color || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  color: e.target.value as any,
                })
              }
            >
              <option value="white">white</option>
              <option value="gray-100">gray-100</option>
              <option value="gray-200">gray-200</option>
              <option value="gray-800">gray-800</option>
              <option value="gray-900">gray-900</option>
              <option value="primary">primary</option>
            </select>

            <label>Font Weight (Override)</label>
            <select
              value={(selectedNode as any).fontWeight || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  fontWeight: (e.target.value || undefined) as any,
                })
              }
            >
              <option value="">Default from Typography</option>
              <option value="normal">Normal</option>
              <option value="semiBold">Semi Bold</option>
              <option value="bold">Bold</option>
            </select>
          </>
        )}

        {/* Carousel properties */}
        {selectedNode.type === "carousel" && (
          <>
            <label
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="checkbox"
                checked={(selectedNode as any).showArrows ?? true}
                onChange={(e) =>
                  onUpdateNode(selectedNode.id, {
                    showArrows: e.target.checked,
                  })
                }
                style={{ width: "auto", marginBottom: 0 }}
              />
              Show Arrows
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={(selectedNode as any).showDots ?? true}
                onChange={(e) =>
                  onUpdateNode(selectedNode.id, {
                    showDots: e.target.checked,
                  })
                }
                style={{ width: "auto", marginBottom: 0 }}
              />
              Show Dots
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <div>
                <label>Width</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  <input
                    type="text"
                    placeholder="e.g. 100%"
                    value={(selectedNode as any).width || ""}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        width: e.target.value,
                      })
                    }
                    style={{ marginBottom: "4px" }}
                  />
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { width: "auto" })
                      }
                    >
                      Auto
                    </button>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { width: "100%" })
                      }
                    >
                      100%
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label>Height</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  <input
                    type="text"
                    placeholder="e.g. 200px"
                    value={(selectedNode as any).height || ""}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        height: e.target.value,
                      })
                    }
                    style={{ marginBottom: "4px" }}
                  />
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { height: "auto" })
                      }
                    >
                      Auto
                    </button>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { height: "100%" })
                      }
                    >
                      100%
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Image specific properties */}
        {selectedNode.type === "image" && (
          <>
            <DynamicField
              label="Image URL"
              value={(selectedNode as any).url || ""}
              fieldKey="url"
              selectedNode={selectedNode}
              onUpdateNode={onUpdateNode}
              activeDynamicField={activeDynamicField}
              setActiveDynamicField={setActiveDynamicField}
              dynamicPopupRef={dynamicPopupRef}
            />

            <label>Alt Text</label>
            <input
              type="text"
              value={(selectedNode as any).alt || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  alt: e.target.value,
                })
              }
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <div>
                <label>Width</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  <input
                    type="text"
                    placeholder="e.g. 100%"
                    value={(selectedNode as any).width || ""}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        width: e.target.value,
                      })
                    }
                    style={{ marginBottom: "4px" }}
                  />
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { width: "auto" })
                      }
                    >
                      Auto
                    </button>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { width: "100%" })
                      }
                    >
                      100%
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label>Height</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  <input
                    type="text"
                    placeholder="e.g. 300px"
                    value={(selectedNode as any).height || ""}
                    onChange={(e) =>
                      onUpdateNode(selectedNode.id, {
                        height: e.target.value,
                      })
                    }
                    style={{ marginBottom: "4px" }}
                  />
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { height: "auto" })
                      }
                    >
                      Auto
                    </button>
                    <button
                      className="size-chip"
                      onClick={() =>
                        onUpdateNode(selectedNode.id, { height: "100%" })
                      }
                    >
                      100%
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <label style={{ marginTop: "12px" }}>Object Fit</label>
            <select
              value={(selectedNode as any).objectFit || "cover"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  objectFit: e.target.value as any,
                })
              }
            >
              <option value="cover">Cover (Fill)</option>
              <option value="contain">Contain (Fit)</option>
              <option value="fill">Stretch</option>
              <option value="scale-down">Scale Down</option>
              <option value="none">None</option>
            </select>
          </>
        )}

        {/* Button properties */}
        {selectedNode.type === "button" && (
          <>
            <DynamicField
              label="Button Label"
              value={(selectedNode as any).label || ""}
              fieldKey="label"
              selectedNode={selectedNode}
              onUpdateNode={onUpdateNode}
              activeDynamicField={activeDynamicField}
              setActiveDynamicField={setActiveDynamicField}
              dynamicPopupRef={dynamicPopupRef}
            />

            <label>Variant</label>
            <select
              value={(selectedNode as any).variant || "primary"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  variant: e.target.value as any,
                })
              }
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>

            <label>Radius</label>
            <select
              value={(selectedNode as any).radius || "md"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  radius: e.target.value as any,
                })
              }
            >
              <option value="sm">sm (4px)</option>
              <option value="md">md (8px)</option>
              <option value="lg">lg (16px)</option>
              <option value="full">full (circular)</option>
            </select>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <input
                type="checkbox"
                checked={(selectedNode as any).fullWidth || false}
                onChange={(e) =>
                  onUpdateNode(selectedNode.id, {
                    fullWidth: e.target.checked,
                  })
                }
                style={{ width: "auto", marginBottom: 0 }}
              />
              Full Width
            </label>
          </>
        )}

        {/* Icon component properties */}
        {selectedNode.type === "icon" && (
          <>
            <label>Icon Identifier</label>
            <select
              value={(selectedNode as any).icon || "star"}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  icon: e.target.value,
                })
              }
            >
              <option value="star">Star</option>
              <option value="user">User</option>
              <option value="heart">Heart</option>
              <option value="bookmark">Bookmark</option>
              <option value="share">Share</option>
              <option value="camera">Camera</option>
              <option value="settings">Settings</option>
              <option value="home">Home</option>
              <option value="search">Search</option>
              <option value="bell">Bell</option>
              <option value="shoppingbag">Shopping Bag</option>
            </select>

            <label>Size (px)</label>
            <input
              type="number"
              value={(selectedNode as any).size || 24}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  size: parseInt(e.target.value) || 24,
                })
              }
            />

            <label>Padding</label>
            <select
              value={(selectedNode as any).padding || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  padding: (e.target.value || undefined) as any,
                })
              }
            >
              <option value="">None</option>
              <option value="xs">xs (4px)</option>
              <option value="sm">sm (8px)</option>
              <option value="md">md (16px)</option>
            </select>

            <label>Background Color</label>
            <select
              value={(selectedNode as any).backgroundColor || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  backgroundColor: (e.target.value || undefined) as any,
                })
              }
            >
              <option value="">Transparent</option>
              <option value="white">white</option>
              <option value="gray-100">gray-100</option>
              <option value="gray-200">gray-200</option>
              <option value="gray-800">gray-800</option>
              <option value="gray-900">gray-900</option>
              <option value="primary">primary</option>
            </select>

            <label>Border Radius</label>
            <select
              value={(selectedNode as any).borderRadius || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  borderRadius: (e.target.value || undefined) as any,
                })
              }
            >
              <option value="">None</option>
              <option value="sm">sm (4px)</option>
              <option value="md">md (8px)</option>
              <option value="lg">lg (16px)</option>
              <option value="full">full (circular)</option>
            </select>
          </>
        )}
        {/* Divider properties */}
        {selectedNode.type === "divider" && (
          <>
            <label>Space Height (e.g. 20px)</label>
            <input
              type="text"
              placeholder="e.g. 20px"
              value={(selectedNode as any).height || ""}
              onChange={(e) =>
                onUpdateNode(selectedNode.id, {
                  height: e.target.value,
                })
              }
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              {["8px", "16px", "24px", "32px", "48px"].map((h) => (
                <button
                  key={h}
                  className="size-chip"
                  onClick={() => onUpdateNode(selectedNode.id, { height: h })}
                >
                  {h}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
