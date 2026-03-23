# Template Builder & SDK (CVD)

Este repositório contém o ecossistema para criação e renderização de templates dinâmicos (**Custom View Definition**) para a plataforma Directo.

## 📁 Estrutura do Projeto

- **`lib/` (@directo/template-builder)**: SDK compartilhado que centraliza tipos, lógica de renderização e componentes React para consumir os templates.
- **`core/`**: Central de dados brutos e esquemas (JSONs de templates, temas e mocks de posts).
- **`client-react/`**: Aplicação de demonstração que consome o SDK `@directo/template-builder/react`.
- **`client_flutter/`**: (Em desenvolvimento) App Flutter para renderização dos templates.

---

## 🚀 Como Rodar

### 1. Build da Biblioteca (SDK)

Sempre que houver mudanças na `lib/`, é necessário recompilar:

```bash
cd lib
npm install
npm run build
```

### 2. Rodar o Demo React

```bash
cd client-react
npm install
npm run dev
```

---

## 🛠️ Desenvolvimento

### Scripts no Root

Na raiz do projeto, você pode usar:

- `npm run build:lib`: Compila o SDK.
- `npm run build:react`: Compila o demo React.
- `npm run build:all`: Compila tudo.

### JSON Schema

Para entender a estrutura dos templates, consulte o [JSON_SCHEMA_MANUAL.md](./JSON_SCHEMA_MANUAL.md).
