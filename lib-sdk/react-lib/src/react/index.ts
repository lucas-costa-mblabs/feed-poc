// Components
export { TemplateProvider } from "./TemplateProvider.js";
export { Post } from "./Post.js";
export { JSONRenderer } from "./JSONRenderer.js";

// Context hook (for advanced usage)
export { useTemplateContext } from "./context.js";

// Types re-export
export type {
  Post as PostType,
  PostShop,
  DirectoAiTemplate,
  ComponentNode,
  ComponentType,
  Theme,
  SpacingToken,
  BorderRadiusToken,
  TypographyToken,
} from "../core/types.js";

export type { TemplateProviderProps } from "./TemplateProvider.js";
export type { PostProps } from "./Post.js";
