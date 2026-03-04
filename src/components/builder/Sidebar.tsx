import { useState } from "react";

interface SidebarProps {
  onDragStart: (e: React.DragEvent, type: string) => void;
  onBack: () => void;
}

export default function Sidebar({ onDragStart, onBack }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("Elements");

  return (
    <aside className="builder-sidebar">
      <div className="sidebar-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              color: "inherit",
              borderRadius: "4px",
            }}
            title="Voltar"
            className="top-bar-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div className="sidebar-header-icon" style={{ marginLeft: "4px" }}>
            Template Builder
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ cursor: "pointer" }}
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>

      <div className="sidebar-tabs">
        <div
          className={`sidebar-tab ${activeTab === "Elements" ? "active" : ""}`}
          onClick={() => setActiveTab("Elements")}
        >
          Elements
        </div>
        <div
          className={`sidebar-tab ${activeTab === "Global" ? "active" : ""}`}
          onClick={() => setActiveTab("Global")}
        >
          Global
        </div>
      </div>

      <div className="sidebar-content">
        {/* ELEMENTS TAB CONTENT */}
        {activeTab === "Elements" && (
          <>
            <div className="widget-section">
              <div className="widget-section-title">Containers</div>
              <div className="widget-grid">
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "container")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                  <div className="widget-name">Container</div>
                </div>
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "carousel")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
                      <circle cx="8" cy="12" r="1" />
                      <circle cx="16" cy="12" r="1" />
                    </svg>
                  </div>
                  <div className="widget-name">Carousel</div>
                </div>
              </div>
            </div>

            <div className="widget-section">
              <div className="widget-section-title">Visuals</div>
              <div className="widget-grid">
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "text")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 7 4 4 20 4 20 7" />
                      <line x1="9" y1="20" x2="15" y2="20" />
                      <line x1="12" y1="4" x2="12" y2="20" />
                    </svg>
                  </div>
                  <div className="widget-name">Text</div>
                </div>
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "divider")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <div className="widget-name">Divider</div>
                </div>
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "image")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div className="widget-name">Image</div>
                </div>
              </div>
            </div>

            <div className="widget-section">
              <div className="widget-section-title">Actions</div>
              <div className="widget-grid">
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "button")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="8" width="18" height="8" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div className="widget-name">Button</div>
                </div>
                <div
                  className="widget-item"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, "icon")}
                >
                  <div className="widget-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="widget-name">Icon</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* GLOBAL TAB CONTENT */}
        {activeTab === "Global" && (
          <div className="global-settings">
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
                lineHeight: "1.4",
              }}
            >
              Configurações baseadas no Design System (Server-Driven UI /
              template_manual.md)
            </p>

            <div className="settings-group">
              <div className="widget-section-title">
                📏 Espaçamento (Padding/Gap)
              </div>
              <div className="token-grid">
                <div className="token-item">
                  <span>xs</span>
                  <small>4px</small>
                </div>
                <div className="token-item">
                  <span>sm</span>
                  <small>8px</small>
                </div>
                <div className="token-item">
                  <span>md</span>
                  <small>16px</small>
                </div>
                <div className="token-item">
                  <span>lg</span>
                  <small>24px</small>
                </div>
                <div className="token-item">
                  <span>xl</span>
                  <small>32px</small>
                </div>
                <div className="token-item">
                  <span>xxl</span>
                  <small>48px</small>
                </div>
              </div>
            </div>

            <div className="settings-group" style={{ marginTop: "1.5rem" }}>
              <div className="widget-section-title">🎨 Cores</div>
              <div className="color-list">
                <div className="color-item">
                  <div
                    className="color-swatch border-color"
                    style={{ backgroundColor: "#ffffff" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">white</span>
                    <span className="color-hex">#ffffff</span>
                  </div>
                </div>
                <div className="color-item">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: "#f3f4f6" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">gray-100</span>
                    <span className="color-hex">#f3f4f6</span>
                  </div>
                </div>
                <div className="color-item">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: "#e2e8f0" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">gray-200</span>
                    <span className="color-hex">#e2e8f0</span>
                  </div>
                </div>
                <div className="color-item">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: "#1f2937" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">gray-800</span>
                    <span className="color-hex">#1f2937</span>
                  </div>
                </div>
                <div className="color-item">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: "#111827" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">gray-900</span>
                    <span className="color-hex">#111827</span>
                  </div>
                </div>
                <div className="color-item">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: "#6366f1" }}
                  ></div>
                  <div className="color-info">
                    <span className="color-name">primary</span>
                    <span className="color-hex">#6366f1 (Ações)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-group" style={{ marginTop: "1.5rem" }}>
              <div className="widget-section-title">
                📐 Bordas (Border Radius)
              </div>
              <div className="token-grid">
                <div className="token-item">
                  <span>sm</span>
                  <small>4px</small>
                </div>
                <div className="token-item">
                  <span>md</span>
                  <small>8px</small>
                </div>
                <div className="token-item">
                  <span>lg</span>
                  <small>16px</small>
                </div>
                <div className="token-item">
                  <span>full</span>
                  <small>50%</small>
                </div>
              </div>
            </div>

            <div className="settings-group" style={{ marginTop: "1.5rem" }}>
              <div className="widget-section-title">
                🔠 Tipografia (Font Size)
              </div>
              <div className="token-grid">
                <div className="token-item">
                  <span>xs</span>
                  <small>12px</small>
                </div>
                <div className="token-item">
                  <span>sm</span>
                  <small>14px</small>
                </div>
                <div className="token-item">
                  <span>md</span>
                  <small>16px</small>
                </div>
                <div className="token-item">
                  <span>lg</span>
                  <small>18px</small>
                </div>
                <div className="token-item">
                  <span>xl</span>
                  <small>24px</small>
                </div>
                <div className="token-item">
                  <span>xxl</span>
                  <small>32px</small>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
