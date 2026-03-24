import { TemplateProvider, Post } from "@directo/template-builder/react";
import type {
  DirectoAiTemplate,
  Theme,
  PostType,
} from "@directo/template-builder/react";
import "./App.css";

// ─── Mock: simulando dados vindos de endpoints ───
// Futuramente estes dados virão de chamadas HTTP reais.

import templateData from "../../core/template.json";
import themeData from "../../core/theme.json";
import postsData from "../../core/posts.json";

const templates = templateData as DirectoAiTemplate[];
const theme = themeData as Theme;
const posts = postsData as PostType[];

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
      <TemplateProvider theme={theme} templates={templates}>
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
            <Post key={post.id} post={post} />
          ))}
        </div>
      </TemplateProvider>
    </div>
  );
}

export default App;
