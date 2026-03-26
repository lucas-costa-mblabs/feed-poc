import { TemplateProvider, Post } from "@directo/template-builder/react";
import "./App.css";

// ─── Mock: simulando dados vindos de endpoints ───
import fullResponse from "../full.response.json";

// ─── App ───

function App() {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f7",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <TemplateProvider
        theme={fullResponse.theme as any}
        templates={fullResponse.templates as any}
        config={{
          accountId: "0b455c19-e389-4a7f-b83c-ef0cf7286ecb",
          apiKey: "mock-api-key",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
            maxWidth: "100%",
          }}
        >
          {fullResponse.posts.map((post, index) => (
            <Post key={post.id || post.contentId || index} post={post as any} />
          ))}
        </div>
      </TemplateProvider>
    </div>
  );
}

export default App;
