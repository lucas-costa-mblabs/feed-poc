import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function ensureDermageSeeded() {
  const entries = getTemplatesIndex();
  if (!entries.find((e) => e.id === "dermage")) {
    upsertTemplateEntry({ id: "dermage", name: "Template Dermage", updatedAt: "—" });
  }
}

function TemplateCard({
  t,
  onOpen,
  onRename,
}: {
  t: TemplateEntry;
  onOpen: () => void;
  onRename: (newName: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(t.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraft(t.name);
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== t.name) onRename(trimmed);
    setEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <div className="template-card" onClick={onOpen}>
      <div className="template-thumbnail">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
      <div className="template-info">
        {editing ? (
          <input
            ref={inputRef}
            className="template-name-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={onKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div className="template-name">{t.name}</div>
            <button
              className="rename-btn"
              title="Renomear"
              onClick={startEdit}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        )}
        <div className="template-meta">
          <span>Portrait 4:5</span>
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

  const handleRename = (id: string, newName: string) => {
    const entry = templates.find((t) => t.id === id);
    if (!entry) return;
    upsertTemplateEntry({ ...entry, name: newName });
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, name: newName } : t)));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">Director AI - Templates</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => navigate("/templates")}>
            Ver Templates
          </button>
          <button className="btn-primary" onClick={() => navigate("/builder/new")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="template-card create-new" onClick={() => navigate("/builder/new")}>
            <div className="create-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              onOpen={() => navigate(`/builder/${t.id}`)}
              onRename={(newName) => handleRename(t.id, newName)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
