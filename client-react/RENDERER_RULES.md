# Renderer Component Rules

Manual de regras e convenções para manutenção e criação de novos componentes no sistema de renderização JSON → React (`client-react`).

---

## 1. Arquitetura

```
src/
├── JSONRenderer.tsx              ← Factory (entry point)
├── components/Renderer/
│   ├── types.ts                  ← Tipos compartilhados
│   ├── utils.ts                  ← Funções utilitárias (tokens, cores, variáveis)
│   ├── ContainerNode.tsx         ← Componente composto (renderiza filhos)
│   ├── TextNode.tsx
│   ├── MediaNode.tsx
│   ├── DividerNode.tsx
│   ├── ButtonNode.tsx
│   ├── PriceNode.tsx             ← Componente composto (preço + desconto)
│   ├── IconNode.tsx
│   └── PostInteractionsNode.tsx  ← Componente composto (like/save/share)
```

### Regra: Object Literal, nunca switch/case

O `JSONRenderer.tsx` resolve o componente correto via **object literal**:

```tsx
const nodeTypes: Record<string, React.FC<NodeProps>> = {
  container: ContainerNode,
  text: TextNode,
  // ...
};

const Component = nodeTypes[node.type];
```

> **Nunca use switch/case** para mapear tipos. Ao adicionar um novo tipo, basta adicionar uma entrada no objeto `nodeTypes`.

---

## 2. Criando um Novo Componente

### Passo a passo

1. Crie o arquivo `src/components/Renderer/MeuNovoNode.tsx`.
2. Use a interface `NodeProps` de `./types`.
3. Importe tipos com `import type` (obrigatório pelo `verbatimModuleSyntax` do tsconfig).
4. Registre o componente no object literal `nodeTypes` em `JSONRenderer.tsx`.

### Template mínimo

```tsx
import React from "react";
import type { NodeProps } from "./types";

export default function MeuNovoNode({ node, dataContext }: NodeProps) {
  const baseStyle: React.CSSProperties = {
    flex: node.flex || undefined,
    minHeight: node.flex ? 0 : undefined, // OBRIGATÓRIO se o nó puder receber flex
  };

  return <div style={{ ...baseStyle }}>{/* Renderização aqui */}</div>;
}
```

---

## 3. Regras de Estilo Obrigatórias

### 3.1 — `baseStyle` é obrigatório

Todo componente DEVE ter um `baseStyle` com pelo menos:

```tsx
const baseStyle: React.CSSProperties = {
  flex: node.flex || undefined,
};
```

O `baseStyle` deve ser **espalhado por último** no objeto `style` do elemento raiz:

```tsx
style={{
  display: "flex",
  // ... outras propriedades
  ...baseStyle, // SEMPRE por último
}}
```

### 3.2 — `minHeight: 0` para itens com flex

Quando um nó recebe `flex: 1` (ou qualquer valor), ele precisa de `minHeight: 0` para **permitir que o conteúdo encolha** dentro de um container com altura fixa. Sem isso, a imagem/conteúdo interno "estoura" o card.

```tsx
minHeight: node.flex ? 0 : undefined,
```

> **Isso é crítico.** Sem `minHeight: 0`, o CSS Flexbox não permite que o filho encolha abaixo do tamanho intrínseco do seu conteúdo.

### 3.3 — Tokens de espaçamento (nunca valores hardcoded)

Use sempre a função `tokenToPx()` para converter tokens do JSON:

| Token | Valor  |
| ----- | ------ |
| `xs`  | `4px`  |
| `sm`  | `8px`  |
| `md`  | `16px` |
| `lg`  | `24px` |
| `xl`  | `32px` |
| `xxl` | `48px` |

### 3.4 — Cores via `colorToHex()`

Sempre resolva cores usando `colorToHex()`. Nunca use strings de cor diretamente do JSON sem passar pelo resolver.

| Token      | Hex       |
| ---------- | --------- |
| `white`    | `#ffffff` |
| `gray-100` | `#f3f4f6` |
| `gray-200` | `#e2e8f0` |
| `gray-800` | `#1f2937` |
| `gray-900` | `#111827` |
| `primary`  | `#6366f1` |

### 3.5 — Variáveis Mustache via `resolveVariables()`

Qualquer valor que possa conter `{{post.campo}}` DEVE ser resolvido com `resolveVariables(valor, dataContext)`.

---

## 4. Regras de Ícones

### Biblioteca: `lucide-react`

- **Nunca use emojis** para representar ícones.
- Use sempre ícones outline (não preenchidos).
- `strokeWidth: 1.5` — padrão para todos os ícones (aspecto clean e refinado).
- Cor padrão: `#1f2937` (`gray-800`) — monocromático.

### Adicionando novos ícones ao `IconNode`

O `IconNode` mantém um mapeamento de `node.icon` → componente Lucide. Para adicionar um novo ícone:

```tsx
import { ShoppingBag, Sparkles, NovoIcone } from "lucide-react";

// No corpo do componente:
const iconMap: Record<string, React.FC<any>> = {
  shoppingbag: ShoppingBag,
  sparkles: Sparkles,
  novoicone: NovoIcone,
};
const IconComponent = iconMap[node.icon] || Sparkles;
```

### Ícones no `PostInteractionsNode`

| Ação  | Ícone Lucide | Observação                                     |
| ----- | ------------ | ---------------------------------------------- |
| Like  | `Heart`      | Outline, não preenchido                        |
| Save  | `Bookmark`   | Outline, não preenchido                        |
| Share | `Share2`     | O ícone clássico de compartilhar (nós de rede) |

---

## 5. Regras do Card (App.tsx)

O card externo que envolve cada post segue estas regras:

```tsx
{
  width: "400px",
  maxWidth: "100%",
  height: "75vh",           // Mostra pedaço do próximo post para incentivar scroll
  display: "flex",          // OBRIGATÓRIO para que flex:1 dos filhos funcione
  flexDirection: "column",  // OBRIGATÓRIO
  backgroundColor: "white",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
  overflow: "hidden",       // Garante que conteúdo não vaze do borderRadius
}
```

> **Nunca remova** `display: flex` e `flexDirection: column` do card. Sem isso, o `flex: 1` do contêiner da mídia não funciona e a imagem empurra o conteúdo para fora.

---

## 6. Regras do Botão

- `width: 100%` por padrão (a menos que `fullWidth: false` seja explicitamente passado no JSON).
- A cor de fundo padrão é `primary` (`#6366f1`).
- Variantes disponíveis: `primary` (default), `outline`, `ghost`.

---

## 7. Regras do Container

O `ContainerNode` é o único componente que renderiza filhos recursivamente via `JSONRenderer`. Ele DEVE:

- Usar `display: flex` sempre.
- Suportar `direction`, `justifyContent`, `alignItems`, `gap`.
- Suportar `paddingX`, `paddingY`, `marginX`, `marginY` via `tokenToPx()`.
- Suportar `flex: N` para distribuição flexível de espaço.
- O `height` default é `"auto"`, nunca `"100%"` (use `flex: 1` quando quiser que o container preencha o espaço disponível).

---

## 8. Regras de Importação (TypeScript)

- Sempre use `import type` para tipos e interfaces:
  ```tsx
  import type { NodeProps } from "./types";
  ```
- Isso é obrigatório pelo `verbatimModuleSyntax` habilitado no `tsconfig.app.json`.

---

## 9. Checklist para Novo Componente

- [ ] Arquivo criado em `src/components/Renderer/[NomeNode].tsx`
- [ ] Usa `import type { NodeProps }` de `./types`
- [ ] Tem `baseStyle` com `flex` e `minHeight`
- [ ] `baseStyle` é espalhado **por último** no style do elemento raiz
- [ ] Valores dinâmicos passados por `resolveVariables()`
- [ ] Cores resolvidas por `colorToHex()`
- [ ] Espaçamentos resolvidos por `tokenToPx()`
- [ ] Registrado no object literal `nodeTypes` em `JSONRenderer.tsx`
- [ ] Build passa sem erros (`npm run build`)

---

## 10. Armadilhas Comuns (Gotchas)

| Problema                                           | Causa                                                   | Solução                                                        |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| Imagem empurra conteúdo para fora do card          | Falta `flex: 1` no container da mídia ou `minHeight: 0` | Usar `flex: 1` no JSON e `minHeight: 0` no baseStyle           |
| Texto centralizado quando deveria estar à esquerda | CSS global com `text-align: center`                     | Garantir que `App.css` não tem `text-align: center` no `#root` |
| Botão não ocupa toda a largura                     | `fullWidth` não definido no JSON                        | Button usa `width: 100%` por padrão (`fullWidth !== false`)    |
| Ícones coloridos/emojis                            | Usar emojis em vez de Lucide                            | Sempre usar `lucide-react` com `strokeWidth: 1.5`              |
| Erro TS1484 "must be imported using type-only"     | Import de tipo sem `type` keyword                       | Usar `import type { ... }`                                     |
| Container não respeita altura fixa do pai          | Falta `display: flex` no card pai                       | Card pai DEVE ter `display: flex` + `flexDirection: column`    |
