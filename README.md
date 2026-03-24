# Template Builder & SDK (CVD)

Este repositório contém o ecossistema completo para criação, gerenciamento e renderização de templates dinâmicos (**Custom View Definition**) para a plataforma Directo. O sistema é multiplataforma, suportando **React** e **Flutter**.

## 📁 Estrutura do Projeto

- **`lib-sdk/react-lib/`**: SDK React que centraliza a lógica de renderização e componentes (`JSONRenderer`, `TemplateProvider`).
- **`lib-sdk/flutter-sdk/`**: SDK Flutter para renderização nativa de templates.
- **`client-react/`**: Aplicação de demonstração/editor em React que consome o SDK.
- **`client_flutter/`**: App de demonstração em Flutter.
- **`core/`**: Central de dados, esquemas JSON e assets compartilhados.

---

## 🛠️ Desenvolvimento Local

Para facilitar o desenvolvimento, você pode vincular os SDKs localmente sem precisar publicá-los.

### React (Linking Local)

No seu `package.json` do projeto consumidor (ex: `client-react`), use o protocolo `file:`:

```json
"@directo/template-builder": "file:../lib-sdk/react-lib"
```

Depois, rode `npm install` para criar o link simbólico.

### Flutter (Dependency Override)

No seu `pubspec.yaml`, aponte para o caminho local:

```yaml
dependencies:
  directo_template_builder:
    path: ../lib-sdk/flutter-sdk
```

---

## 🚀 Como Rodar

### 1. Preparar o SDK React

Sempre que houver mudanças no código do SDK React, recompile:

```bash
cd lib-sdk/react-lib
npm install
npm run build
```

### 2. Rodar o Demo React

```bash
cd client-react
npm install
npm run dev
```

### 3. Rodar o Demo Flutter

```bash
cd client_flutter
flutter pub get
flutter run
```

---

## 🧪 Testes

Ambos os SDKs possuem suítes de testes abrangentes que garantem a paridade de renderização.

### React SDK

```bash
cd lib-sdk/react-lib
npm test
```

### Flutter SDK

```bash
cd lib-sdk/flutter-sdk
flutter test
```

---

## 📜 Documentação Adicional

- **Estrutura do JSON**: Consulte o [JSON_SCHEMA_MANUAL.md](./JSON_SCHEMA_MANUAL.md) para detalhes técnicos sobre os filtros e propriedades dos nodes.
