# Manual de Interpretação: JSON Server-Driven UI

Este documento descreve como interpretar e renderizar o JSON exportado pelo builder do template na sua plataforma (React JS, React Native ou Flutter).

O JSON exportado é uma árvore hierárquica baseada no conceito do Server-Driven UI e consiste num Array de nós (nodes) primários, onde os `blocks` (quando do tipo `container`) englobam outros componentes aninhados.

---

## 🏗️ 1. Estrutura Base (ComponentNode Base)

Todo objeto node conterá **obrigatoriamente** as seguintes propriedades básicas:

```typescript
{
  "id": "string",       // Identificador único (ex: 'a1b2c3d4e')
  "type": "string",     // Tipo do componente ('container', 'text', 'button', etc.)
  "flex": number        // (Opcional) Peso de distribuição de espaço, útil quando dentro de um container row/col
}
```

---

## 🎨 2. Sistema de Design (Tokens)

As propriedades de layout e estilização frequentemente usam tokens predefinidos:

### 2.1 Espaçamentos (`TokenType`)

Tokens comuns para `padding`, `margin`, `gap`:

- `xs`: ~4px
- `sm`: ~8px
- `md`: ~16px
- `lg`: ~24px
- `xl`: ~32px
- `xxl`: ~48px

### 2.2 Cores (`ColorToken`)

- `white` (#ffffff), `gray-100` (#f3f4f6), `gray-200` (#e2e8f0), `gray-800` (#1f2937), `gray-900` (#111827), `primary` (#6366f1)
- _Nota:_ É comum que códigos seriais (hex `#000000`) sejam passados na ausência de tokens. Seu parser deve suportar hexadecimais como fallback.

---

## 💡 3. Variáveis Dinâmicas

Os valores de texto (ex.: `title`, `url`, `price`) suportam binding de variáveis. São representados pela sintaxe Mustache: `{{ path.var }}`

Quando sua view renderizar esses componentes num contexto dinâmico (ex: a página de um produto), você deverá passar um objeto de `dataContext` e extrair o seu valor:

- `{{ post.price }}` -> Renderizará a propriedade `post.price` do seu Data Context global.

---

## 🧩 4. Componentes e como construir em cada plataforma

Abaixo está o detalhamento por `type` de como interpretar e renderizar as tags de componentes nos três ecossistemas.

### 4.1. Container (`"type": "container"`)

_Componente de layout hierárquico. Pode conter elementos filhos na propriedade `blocks`._

**Propriedades de configuração:**

- `direction`: `"row"` | `"column"` -> Eixo principal
- `justifyContent`: `"space-between"` | `"center"` | `"flex-start"` | `"flex-end"`
- `alignItems`: `"center"` | `"flex-start"` | `"flex-end"`
- `backgroundColor`, `borderColor`: Hex ou Token
- `borderRadius`: `"sm"`, `"md"`, `"lg"`, `"full"`
- `borderWidth`, `borderStyle` (`"solid"` | `"dashed"` | `"dotted"`)
- `paddingX`, `paddingY`, `marginX`, `marginY`, `gap`: Espaçamentos (Tokens)
- `width`, `height`: Medidas fixas/fluídas (`"100%"`, `"auto"`, etc)
- `blocks`: Array de componentes filhos do tipo `ComponentNode[]`.

**Como montar:**

- **React Web:** Usar um `<div style={{ display: "flex", ... }}>` e renderizar a lista em `.blocks`.
- **React Native:** `<View style={{ flexDirection: direction, ... }}>` com `flexWrap` e children loop.
- **Flutter:** Avaliar a `direction` e usar um widget `Column` ou `Row`. Use `Container` em volta se tiver style.

---

### 4.2. Texto (`"type": "text"`)

_Componente para dados em texto simples._

**Propriedades de configuração:**

- `value`: Texto final suportando binding.
- `typography`: `"caption"` (12px), `"body"` (16px), `"heading5"` a `"heading1"`.
- `color`: Token ou Hex.
- `fontWeight`: `"bold"` | `"semiBold"` | `"normal"`.

**Como montar:**

- **React Web:** `<span style={{ fontSize, fontWeight, color }}>{value}</span>`
- **React Native:** `<Text style={{ ... }}>{value}</Text>`
- **Flutter:** `Text(value, style: TextStyle(...))`

---

### 4.3. Mídia / Imagem (`"type": "media"`)

_Renderiza uma imagem simples ou vinda via DataContext._

**Propriedades de configuração:**

- `url`: Endereço da imagem diretamente ou variável (ex: `"{{ post.url }}"`).
- `alt`: Texto alternativo.
- `aspectRatio`, `width`, `height`
- `objectFit`: `"cover"` | `"contain"` | `"fill"` | `"none"` | `"scale-down"`

**Como montar:**

- **React Web:** `<img src={url} alt={alt} style={{ width, height, objectFit }} />`
- **React Native:** `<Image source={{ uri: url }} resizeMode="..." style={{ width, height }} />`
- **Flutter:** `Image.network(url, fit: BoxFit.cover, width: width, height: height)`

---

### 4.4. Divider (`"type": "divider"`)

_Linha de divisão._

**Propriedades de configuração:**

- `thickness`: `"thin"` (0.5px), `"medium"` (1px), `"thick"` (2px).

**Como montar:**

- Renderize um separador (`<hr>` na web, uma `<View>` em react native ou `Divider()` no flutter).

---

### 4.5. Botões (`"type": "button"`)

_Botões de ação clicáveis._

**Propriedades de configuração:**

- `label`: Texto do botão (suporta binding).
- `variant`: `"primary"` (fundo maciço), `"secondary"`, `"outline"`, `"ghost"`.
- `background`: Cor base do botão.
- `radius`: Curvatura (`"sm"`, `"md"`, `"full"`).
- `fullWidth`: `boolean`.
- `size`: Token de padding para espessura do botão.

---

### 4.6. Preço do Produto (`"type": "price"`)

_Componente de loja focado em detalhos de preço com variação/desconto._

**Propriedades de configuração:**

- `price`: Preço principal atual.
- `originalPrice`: Preço original.
- `discountPercent`: % de desconto.
- `showOriginalPrice`, `showDiscountPercent`: `boolean`.
- `paddingX`, `paddingY`: Tokens de espaçamento.

---

### 4.7. Ícone Padrão (`"type": "icon"`)

_Componente individual de ícone._

**Propriedades de configuração:**

- `icon`: Nome reservado do ícone (`"user"`, `"heart"`, `"bookmark"`, etc).
- `backgroundColor`, `borderRadius`, `size`, `padding`.

---

### 4.8. Interações de Post (`"type": "post_interactions"`)

_Módulo pré-pronto para Likes, Saves e Shares do layout de Feed, contendo ícones na horizontal._

**Propriedades de configuração:**

- `showLike`, `showSave`, `showShare`: `boolean`.
- `paddingX`, `paddingY`, `gap`: Tokens.

---

## 🚀 Guia de Renderização Genérica (Exemplo Simples React)

Para ler essa arvore recebida via API na arquitetura desejada, é ideal possuir um mecanismo de interpretação recursiva.

```tsx
function JSONRenderer({ node, dataContext }) {
  if (node.type === "container") {
    return (
      <View style={mapContainerStyles(node)}>
        {node.blocks.map((childNode) => (
          <JSONRenderer
            key={childNode.id}
            node={childNode}
            dataContext={dataContext}
          />
        ))}
      </View>
    );
  }

  if (node.type === "text") {
    const textValue = applyDynamicVariables(node.value, dataContext);
    return <Text style={mapTextStyles(node)}>{textValue}</Text>;
  }

  // Falha de Componente Desconhecido
  return <UnknownComponent />;
}
```
