import { useNavigate } from "react-router-dom";

const MOCK_TEMPLATES = [
  {
    id: "dermage",
    name: "Template Dermage",
    updatedAt: "Hoje, 10:30",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const openBuilder = (id: string) => {
    navigate(`/builder/${id}`);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">Director AI - Templates</div>
        <button className="btn-primary" onClick={() => openBuilder("new")}>
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
      </header>

      <main className="dashboard-content">
        <h2 style={{ marginTop: 0 }}>Seus Templates</h2>

        <div className="templates-grid">
          <div
            className="template-card create-new"
            onClick={() => openBuilder("new")}
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

          {MOCK_TEMPLATES.map((t) => (
            <div
              key={t.id}
              className="template-card"
              onClick={() => openBuilder(t.id)}
            >
              <div className="template-thumbnail">
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
              <div className="template-info">
                <div className="template-name">{t.name}</div>
                <div className="template-meta">
                  <span>Portrait 4:5</span>
                  <span>{t.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
