# Manual de Interpretação: JSON CVD (Server-Driven UI)

Este documento descreve como interpretar e renderizar o JSON exportado pelo novo builder de templates (CVD - Custom View Definition) na sua plataforma (React JS, React Native ou Flutter).

O JSON exportado possui uma estrutura onde a raiz define os metadados do template e a propriedade `template` contém a árvore hierárquica baseada no conceito de Server-Driven UI.

---

## 🏗️ 1. Estrutura Raiz (CVDTemplate)

Todo JSON exportado terá a seguinte estrutura principal:

```json
{
  "id": "123e4567-e89b-12d3",
  "title": "Template de Desconto",
  "active": true,
  "slug": "template-desconto",
  "template": [
    // Array de ComponentNodes (A árvore de componentes)
  ]
}
```

## 🧩 2. ComponentNode Base

Todo objeto dentro do array `template` (e de seus sub-componentes nas propriedades `blocks`) conterá as seguintes propriedades básicas:

```json
{
  "id": "string", // Identificador único do nó
  "type": "string", // Tipo do componente ('container', 'text', 'button', etc.)
  "flex": 1 // (Opcional) Peso de distribuição livre para containers flex
}
```

---

## 🎨 3. Sistema de Design (Tokens)

As propriedades de layout e estilização frequentemente usam tokens predefinidos:

### 3.1 Espaçamentos (`TokenType`)

Utilizado para as propriedades de `padding`, `margin`, `gap` e `size`:

- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px

### 3.2 Cores (`ColorToken`)

Utilizado para suportar o design system:

- **Brand/Base:** `primary`, `secondary`, `accent`
- **Feedback:** `success`, `warning`, `error`, `info`
- **Neutros/Grayscale:** `white`, `black`, `gray-50` até `gray-950`
- **Interações (Estados):** `primary-hover`, `primary-active`, `secondary-hover`, `secondary-active`

> _Nota:_ O builder também envia códigos seriais (hexadecimais, ex: `#FFFFFF`) caso a cor não pertença aos tokens. O parser deve suportar hexadecimais como fallback.

---

## 💡 4. Variáveis Dinâmicas (Data Context)

Muitos valores recebem binding dinâmico. Eles são representados pela sintaxe da linguagem de template Mustache: `{{ variavel }}`.

Quando a view exibir dados dinâmicos de Feed, é necessário usar o `dataContext` do post correspondente para extrair os valores:

- `{{ post.title }}`: Título do conteúdo
- `{{ post.price }}`: Preço com desconto final
- `{{ post.originalPrice }}`: Preço original (riscado)
- `{{ post.discount }}`: Porcentagem de desconto ("12" significa % OFF)
- `{{ post.url }}`: Caminho da imagem de mídia primária
- `{{ post.destinationUrl }}`: Link de redirecionamento/destino
- `{{ post.shop.name }}`: Nome da loja/perfil de quem postou
- `{{ post.shop.avatar }}`: URL da imagem do avatar/ícone da loja
- `{{ post.category }}`, `{{ post.brand }}`, `{{ post.validUntil }}`
- `{{ post.customVariables.html }}`: HTML customizado definido nas variáveis do post

Exemplo prático: `<Text>{{ post.title }}</Text>` renderizará a string correspondente no seu aplicativo.

---

## 📦 5. Dicionário de Componentes e Estruturas

### 5.1. Container (`"type": "container"`)

_Componente de layout e agrupamento hierárquico._

- `direction`: `"row"` | `"column"` -> Eixo principal
- `justifyContent`: `"space-between"`, `"space-evenly"`, `"space-around"`, `"center"`, `"flex-start"`, `"flex-end"`
- `alignItems`: `"center"`, `"flex-start"`, `"flex-end"`
- `backgroundColor`, `borderColor`: Hex ou Token
- `borderRadius`: `"sm"`, `"md"`, `"lg"`, `"full"` (geralmente corresponde a 4px, 8px, 9999px)
- `borderWidth`, `borderStyle` (`"solid"` | `"dashed"` | `"dotted"`)
- `paddingX`, `paddingY`, `marginX`, `marginY`, `gap`: Espaçamentos (Tokens)
- `width`, `height`: Medidas fixas/livres (`"100%"`, `"auto"`, etc)
- `blocks`: Array de componentes filhos do tipo `ComponentNode[]`

### 5.2. Texto (`"type": "text"`)

_Visualização de texto simples/variável._

- `value`: Escrita ou binding
- `typography`: `"caption"` (12px), `"body"` (16px), ou títulos de `"heading5"` (16px) a `"heading1"` (32px).
- `color`: Token ou Hex.
- `fontWeight`: `"bold"` | `"semiBold"` | `"normal"`
- `textAlign`: `"left"` | `"center"` | `"right"`

### 5.3. Mídia / Imagem (`"type": "media"`)

_Renderiza a imagem que veio do DataContext ou configurada._

- `url`: Endereço (ex: `"{{ post.url }}"`)
- `alt`: Título alternativo de acessibilidade
- `aspectRatio`, `width`, `height`
- `objectFit`: `"cover"` | `"contain"` | `"fill"` | `"none"` | `"scale-down"`

### 5.4. Botões (`"type": "button"`)

_Calls to action (CTA)._

- `label`: Nome (suporta dynamic binding)
- `variant`: `"primary"`, `"secondary"`, `"outline"`, `"ghost"`
- `background`: Cor principal ou fall-back caso outline/ghost.
- `radius`: Curvatura (`"sm"`, `"md"`, `"lg"`, `"full"`)
- `url`: Fallback global em caso de web.
- `deeplink`: URL do `destinationUrl` para aplicativo. (Muitas vezes amarrado ao `{{ post.destinationUrl }}`)
- `fullWidth`: `boolean`.
- `size`: Token de dimensão do box do botão (`xs` a `xxl`)

### 5.5. Preço do Produto (`"type": "price"`)

_Célula estilizada para preço com variação/desconto._

- `price`: Corresponde usualmente a `{{ post.price }}`
- `originalPrice`: Valor original `{{ post.originalPrice }}`
- `discountPercent`: Porcentagem do badge `{{ post.discount }}`
- `showOriginalPrice`, `showDiscountPercent`: `boolean` de controle.
- `paddingX`, `paddingY`: Tokens

### 5.6. Interações de Post (`"type": "post_interactions"`)

_Módulo de prateleira para Feed (Like, Bookmark/Save, Share)._

- `showLike`, `showSave`, `showShare`: `boolean`
- `paddingX`, `paddingY`, `gap`: Tokens.

### 5.7. Ícone Padrão (`"type": "icon"`)

_Símbolos escaláveis usando biblioteca do ecossistema._

- `icon`: string com nome normalizado (ex: `"user"`, `"heart"`, `"bookmark"`, `"share"`, `"shopping"`)
- `backgroundColor`, `borderRadius`: Estilizações do box de fundo.
- `size`: `number | string` - Font Size ou tamanho da box.
- `padding`: Tokens

### 5.8. Divider (`"type": "divider"`)

_Régua._

- `thickness`: `"thin"` (0.5px ou ligeiro lighter), `"medium"` (1px), `"thick"` (2px).

### 5.9. HTML Customizado (`"type": "html"`)

_Renderiza HTML arbitrário diretamente no layout. Útil para conteúdo customizado que não se encaixa nos componentes padrão._

- `html`: String HTML para renderizar. Suporta binding com variáveis dinâmicas (ex: `"{{ post.customVariables.html }}"`).
- `paddingX`, `paddingY`: Tokens de espaçamento interno.
- `width`, `height`: Medidas fixas/livres (`"100%"`, `"auto"`, `"300px"`, etc).

> ⚠️ **Atenção:** O conteúdo HTML é renderizado diretamente. No React Web use `dangerouslySetInnerHTML`. No React Native/Flutter, use um componente WebView ou parser de HTML.

### 5.10. Avatar (`"type": "avatar"`)

_Exibe imagem de perfil/avatar com fallback para ícone._

- `url`: URL da imagem do avatar (suporta binding, ex: `"{{ post.shop.avatar }}"`).
- `icon`: Nome do ícone de fallback caso a imagem não carregue (ex: `"user"`).
- `size`: `number | string` - Tamanho do avatar em pixels.
- `backgroundColor`: Token ou Hex para cor de fundo.
- `borderRadius`: `"sm"`, `"md"`, `"lg"`, `"full"` (tipicamente `"full"` para avatares circulares).

---

## 🚀 Guia Prático de Implementação (Exemplo React Web/Native)

A implementação client-side em qualquer plataforma exige que a função seja desenhada para se empilhar de forma recursiva interpretando nós, e recebendo seu contexto ativo e tema.

```tsx
function JSONRenderer({ node, dataContext, theme }) {
  if (node.type === "container") {
    return (
      <View style={mapContainerStyles(node, theme)}>
        {node.blocks.map((childNode) => (
          <JSONRenderer
            key={childNode.id}
            node={childNode}
            dataContext={dataContext}
            theme={theme}
          />
        ))}
      </View>
    );
  }

  if (node.type === "text") {
    const textValue = applyDynamicVariables(node.value, dataContext);
    return <Text style={mapTextStyles(node, theme)}>{textValue}</Text>;
  }

  if (node.type === "button") {
    const link = applyDynamicVariables(node.deeplink || node.url, dataContext);
    return (
      <Button
        onPress={() => handleAction(link)}
        style={mapButtonStyles(node, theme)}
      >
        {applyDynamicVariables(node.label, dataContext)}
      </Button>
    );
  }

  // Falha de Componente Desconhecido
  return <UnknownComponent />;
}
```
