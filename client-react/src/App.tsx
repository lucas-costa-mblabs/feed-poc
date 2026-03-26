import { TemplateProvider, Post } from "@directo/template-builder/react";
import type {
  DirectoAiTemplate,
  Theme,
  PostType,
} from "@directo/template-builder/react";
import "./App.css";

// ─── Mock: simulando dados vindos de endpoints ───
import templateResponse from "../templates.response.json";
import themeResponse from "../theme.response.json";
import feedResponse from "../feed.response.json";

// Mapeamento corrigido para a estrutura da API
const templates = (templateResponse.data as any[]).map((t) => ({
  ...t,
  id: t.templateId,
  title: t.name,
  template: t.data,
})) as DirectoAiTemplate[];

const theme = themeResponse.data as Theme;
const posts = feedResponse.data.feeds as unknown as PostType[];

// ─── App ───

function App() {
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
      <TemplateProvider
        theme={theme}
        templates={templates}
        config={{
          accountId: "0b455c19-e389-4a7f-b83c-ef0cf7286ecb",
          apiKey: "mock-api-key",
          baseUrl: "https://api.dev-directoai.com.br",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
            maxWidth: "100%",
          }}
        >
          {posts.map((post) => (
            <Post key={post.id || post.contentId} post={post} />
          ))}
        </div>
      </TemplateProvider>
    </div>
  );
}

export default App;
