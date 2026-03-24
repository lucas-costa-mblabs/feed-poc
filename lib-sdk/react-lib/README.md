# @directo/template-builder SDK

SDK para renderização de componentes Server-Driven UI (CVD) na Directo.

## 📦 Instalação

Atualmente consumida localmente via link:

```json
"dependencies": {
  "@directo/template-builder": "file:../lib"
}
```

## 🚀 Uso (React)

O SDK fornece o `TemplateProvider` para gerenciar o contexto global (tema e templates) e o componente `Post` para renderizar cards automaticamente.

```tsx
import { TemplateProvider, Post } from "@directo/template-builder/react";
import type {
  Theme,
  DirectoAiTemplate,
  PostType,
} from "@directo/template-builder/react";

const App = () => {
  return (
    <TemplateProvider theme={myTheme} templates={myTemplates}>
      {myPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </TemplateProvider>
  );
};
```

### Componentes Exportados

- **`TemplateProvider`**: Envolve a aplicação. Recebe `theme` e `templates` (array de definições de template).
- **`Post`**: Recebe um objeto `post`. Ele encontra o template correto via `post.templateId` e renderiza a árvore de componentes.
- **`JSONRenderer`**: Renderizador recursivo de baixo nível (usado internamente pelo `Post`).

## 🎨 Sistema de Design

O SDK suporta:

- **Tokens de Espaçamento**: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`.
- **Tokens de Cores**: `primary`, `secondary`, `white`, `gray-500`, etc.
- **Váriáveis Dinâmicas**: Suporta sintaxe `{{ post.title }}` em valores de texto, URLs e labels.

## 🧪 Tipagem

Todas as interfaces estão centralizadas em `@directo/template-builder` (root export):

- `ComponentNode`: Estrutura de cada nó do template.
- `Post`: Entidade de dado para renderização.
- `DirectoAiTemplate`: Definição de design.
- `Theme`: Definição de cores e espaçamentos.
