# Template Builder

Este repositório contém o **Template Builder**, uma ferramenta para construção e visualização de templates, além de projetos clientes em React e Flutter para demonstrar/testar a renderização dos templates.

## 📁 Estrutura do Projeto

O projeto está dividido em três partes principais:

1. **Projeto Raiz (`./`)**: Aplicação principal construída em React com Vite. Funciona como o construtor/editor de templates (Template Builder).
2. **Client React (`./client-react`)**: Uma aplicação cliente de testes construída em React e Vite, utilizada para renderização dos JSONs de templates.
3. **Client Flutter (`./client_flutter`)**: Um aplicativo de testes construído em Flutter para renderizar e visualizar o mesmo padrão de templates gerado do lado do servidor ou builder.

---

## 🚀 Pré-requisitos

Para rodar todo o projeto, você precisará ter instalado em sua máquina:

- **[Node.js](https://nodejs.org/)** (Recomendado versão LTS) - Necessário para os projetos React e gerenciamento de dependências.
- **[Flutter SDK](https://docs.flutter.dev/get-started/install)** - Necessário para rodar o cliente desenvolvido em Flutter.
- Um emulador (Android/iOS) rodando, um dispositivo físico conectado ou Chrome/Desktop habilitado para Flutter, para poder testar o aplicativo em Flutter.

---

## 🛠️ Instalação das dependências

Antes de rodar qualquer projeto, você deve instalar as dependências de cada uma das aplicações.

**1. Dependências do Projeto Raiz**
Na raiz do projeto (`template-builder`), instale os pacotes e ferramentas de desenvolvimento (como o `concurrently`, usado pelos scripts):

```bash
npm install
```

**2. Dependências do Cliente React**

```bash
cd client-react
npm install
cd ..
```

**3. Dependências do Cliente Flutter**

```bash
cd client_flutter
flutter pub get
cd ..
```

---

## ▶️ Como rodar o projeto

### Opção 1: Rodando a Aplicação Principal (Template Builder)

Para iniciar a aplicação raiz (o builder/painel principal), execute na **raiz do projeto**:

```bash
npm run dev
```

Após executar esse comando, o Vite mostrará no terminal algo como `http://localhost:5173`. Acesse pelo navegador para visualizar a plataforma.

### Opção 2: Rodando os Clientes Separadamente

Se você deseja testar os clientes isoladamente. Nos terminais rodando a partir da **raiz do projeto**, há atalhos configurados:

- **Para rodar o Cliente React:**

  ```bash
  npm run dev:react
  ```

  Isso irá entrar na pasta `client-react` e rodar a aplicação React lá de dentro em outro endpoint (ex: `http://localhost:5174`).

- **Para rodar o Cliente Flutter:**
  ```bash
  npm run dev:flutter
  ```
  Isso irá entrar na pasta `client_flutter` e fazer o `flutter run` padrão.

### Opção 3: Rodando Ambos os Clientes Simultaneamente

O projeto prevê um comando unificado para iniciar tanto o cliente React quanto o app Flutter ao mesmo tempo (isso requer que as dependências da raiz estejam instaladas e que exista um dispositivo disponível para o Flutter executar).

Na **raiz do projeto**, rode:

```bash
npm run dev:all
```

_(Nota: Lembre-se que você precisará de um terminal separado rodando `npm run dev` se também quiser manter o Builder em execução enquanto testa com `dev:all`)_.

---

## 📝 Scripts Disponíveis do `package.json` raiz

Aqui está um resumo de todos os atalhos criados na raiz para facilitar o uso:

- `npm run dev` - Inicializa o projeto principal.
- `npm run dev:react` - Roda `dev` dentro da pasta `client-react`.
- `npm run dev:flutter` - Roda a aplicação `client_flutter`.
- `npm run dev:all` - Roda o `client-react` e o `client_flutter` juntos na mesma janela de terminal usando a lib `concurrently`.
- `npm run build` - Faz a compilação e build da aplicação raiz.
- `npm run preview` - Gera uma visualização de produção com `vite preview`.
