# Manual: Como montar o JSON (Server-Driven UI)

Este manual documenta como estruturar o JSON que alimenta nosso motor Server-Driven UI. A arquitetura é flexível e baseia-se em componentes (blocos) e um Design System predefinido (tokens semânticos) para consistência.

## 1. Estrutura Base

O documento começa declarando que é uma renderização de base, no formato comum de container (`card` ou `view` dependendo do nível raiz) que carrega um array de elementos visuais dentro de `"blocks"`.

```json
{
  "id": "identificador_unico",
  "type": "card", // Tipo do container principal
  "style": {
    /* ...estilos opcionais baseados em tokens... */
  },
  "blocks": [
    // ... Aqui vão os blocos visuais ...
  ]
}
```

## 2. Tokens de Design (Variáveis Semânticas)

Para manter o layout padronizado, usamos os seguintes mapas de tokens que o Front-End interpreta:

### 📏 Tokens de Espaçamento (`padding`, `gap`, `margin`, etc.)

- `"xs"`: 4px
- `"sm"`: 8px
- `"md"`: 16px
- `"lg"`: 24px
- `"xl"`: 32px
- `"xxl"`: 48px

### 🎨 Tokens de Cor (`color`, `backgroundColor`, `borderColor`)

- `"white"`: #ffffff
- `"gray-100"`: #f3f4f6
- `"gray-200"`: #e2e8f0
- `"gray-800"`: #1f2937
- `"gray-900"`: #111827
- `"primary"`: #6366f1 (Padrão para ações/botões)

### 📐 Tokens de Bordas (`borderRadius`)

- `"sm"`: 4px
- `"md"`: 8px
- `"lg"`: 16px
- `"full"`: 50% (Geralmente para avatares perfeitos redondamente)

### 🔠 Tokens de Tipografia (`fontSize`)

- `"xs"`: 12px
- `"sm"`: 14px
- `"md"`: 16px
- `"lg"`: 18px
- `"xl"`: 24px
- `"xxl"`: 32px

---

## 3. Catálogo de Componentes (`type`)

Esses são os blocos construtores que você pode usar na propriedade `"type"`.

### Containers

Usados para agrupar outros blocos e criar estruturas de tela usando flexbox.

- **`row`**: Container flexível onde os filhos ocupam a mesma linha (esquerda para direita).
- **`column`**: Container flexível onde os filhos empilham-se verticalmente (cima para baixo).
- **`card`**: Container que aceita estilos de caixa ao redor, também empilha verticalmente, mas comumente restrito por `border` ou `shadow`.

> Exemplo de layout Flex com `"justifyContent"` e `"alignItems"`:

```json
{
  "type": "row",
  "justifyContent": "space-between", // space-between, center, flex-start, flex-end
  "alignItems": "center", // center, flex-start, flex-end
  "gap": "md", // Distância entre os filhos de 16px
  "blocks": [
    /* ... */
  ]
}
```

### Componentes Visuais Simples

- **`text`**: Mostra um texto.
  - Campos: `"value"`, `"fontSize"` (token), `"fontWeight"` ("bold", "normal"), `"color"` (token).
- **`divider`**: Adiciona uma linha espaçadora de contorno.
- **`image`**: Exibe uma foto.
  - Campos: `"url"`, `"alt"` (Para acessibilidade), `"aspectRatio"` (ex: "1:1", "16:9").
- **`avatar`**: Pequeno balão para foto de perfil ou ícones simples iniciais.
  - Campos: `"icon"`, `"backgroundColor"`.

### Ações (Interatividade)

- **`cta`** (Call to Action): Botão de destaque principal com label por extenso.
  - Campos: `"label"` (Ex: "Comprar"), `"style"` (Ex: "primary"), `"fullWidth"` (Booleano - preencher largura total da tela).
- **`icon_button`**: Botões compostos de um único ícone.
  - Campos: `"icon"` (Nome do ícone ou emoji em POC).

Para ambos os componentes interativos, usamos o campo `"action"` que diz ao front-end o que executar:

1. `"deeplink:/caminho/X"`: Abre uma rota/tela de aplicativo.
2. `"action:acaoA" / "action:favorite"`: Dispara um sinal (trigger) pra API ou SDK agir por baixo dos panos na tela atual.

---

## 4. Exemplo Completo Juntando Tudo

Um cabeçalho pequeno com uma foto da loja e o Text a direita, bem espaçadinhos.

```json
{
  "type": "row",
  "padding": "md",
  "alignItems": "center",
  "blocks": [
    {
      "type": "avatar",
      "icon": "🛍️",
      "backgroundColor": "gray-100"
    },
    {
      "type": "text",
      "value": "Nome Legal",
      "fontWeight": "bold",
      "marginLeft": "sm",
      "color": "gray-900",
      "fontSize": "md"
    }
  ]
}
```
