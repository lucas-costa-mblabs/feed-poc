import JSONRenderer, { type ComponentNode } from "./JSONRenderer";
import posts from "./posts.json";
import templateData from "./template.json";
import "./App.css";

function App() {
  const blocks = templateData.template as ComponentNode[];

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 40px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              width: "400px",
              maxWidth: "100%",
              height: "75vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow:
                "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            {blocks.map((node) => (
              <JSONRenderer
                key={`${index}-${node.id}`}
                node={node}
                dataContext={{ post }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
