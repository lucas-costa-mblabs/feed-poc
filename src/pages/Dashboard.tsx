import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentRenderer from "../components/ComponentRenderer";
import { dermageProductTemplate } from "../templates/dermageTemplate";

export type TemplateEntry = {
  id: string;
  name: string;
  updatedAt: string;
};

const TEMPLATES_INDEX_KEY = "builder-templates-index";

export function getTemplatesIndex(): TemplateEntry[] {
  const saved = localStorage.getItem(TEMPLATES_INDEX_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveTemplatesIndex(entries: TemplateEntry[]) {
  localStorage.setItem(TEMPLATES_INDEX_KEY, JSON.stringify(entries));
}

export function upsertTemplateEntry(entry: TemplateEntry) {
  const entries = getTemplatesIndex();
  const idx = entries.findIndex((e) => e.id === entry.id);
  if (idx >= 0) {
    entries[idx] = entry;
  } else {
    entries.push(entry);
  }
  saveTemplatesIndex(entries);
}

export function deleteTemplateEntry(id: string) {
  const entries = getTemplatesIndex();
  const updated = entries.filter((e) => e.id !== id);
  saveTemplatesIndex(updated);
  localStorage.removeItem(`builder-template-${id}`);
}

function ensureDermageSeeded() {
  const entries = getTemplatesIndex();
  if (!entries.find((e) => e.id === "dermage")) {
    upsertTemplateEntry({
      id: "dermage",
      name: "Template Dermage",
      updatedAt: "—",
    });
  }
}

function getTemplateComponents(id: string): any[] {
  const saved = localStorage.getItem(`builder-canvas-data-${id}`);
  if (saved) return JSON.parse(saved);
  if (id === "dermage") {
    return dermageProductTemplate;
  }
  return [];
}

function TemplateCard({
  t,
  onOpen,
  onDelete,
  components,
}: {
  t: TemplateEntry;
  onOpen: () => void;
  onDelete: (id: string) => void;
  components: any[];
}) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      window.confirm(`Tem certeza que deseja excluir o template "${t.name}"?`)
    ) {
      onDelete(t.id);
    }
  };

  return (
    <div className="template-card" onClick={onOpen}>
      <div className="template-thumbnail">
        {components.length > 0 ? (
          <div
            style={{
              width: "420px",
              height: "550px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(0.42)",
              transformOrigin: "center center",
              pointerEvents: "none",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {components.map((node) => (
              <ComponentRenderer
                key={node.id}
                node={node}
                selectedNodeId={null}
                dragOverNodeId={null}
                dragPosition={null}
                onSelect={() => {}}
                onDragStartNode={() => {}}
                onDragOverNode={() => {}}
                onDragLeaveNode={() => {}}
                onDropNode={() => {}}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </div>
      <div className="template-info">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <div className="template-name">{t.name}</div>
          <button
            className="delete-card-btn"
            title="Excluir"
            onClick={handleDelete}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
        <div className="template-meta">
          <span>{t.updatedAt}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateEntry[]>([]);

  const refresh = () => {
    ensureDermageSeeded();
    setTemplates(getTemplatesIndex());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (id: string) => {
    deleteTemplateEntry(id);
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">Director AI - Templates</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="btn-secondary"
            onClick={() => navigate("/templates")}
          >
            Ver Templates
          </button>
          <button
            className="btn-primary"
            onClick={() => navigate("/builder/new")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Novo Template
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <h2 style={{ marginTop: 0 }}>Seus Templates</h2>

        <div className="templates-grid">
          <div
            className="template-card create-new"
            onClick={() => navigate("/builder/new")}
          >
            <div className="create-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <div style={{ fontWeight: 500 }}>Criar Branco</div>
          </div>

          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              t={t}
              components={getTemplateComponents(t.id)}
              onOpen={() => navigate(`/builder/${t.id}`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
