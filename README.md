# 📘 **JOTA News – Portal de Notícias V2**

🌐 **Demo online:** https://jota-news-by-samuca-git-v2-samuel-caetites-projects.vercel.app/

Um portal de notícias desenvolvido com **Next.js (Pages Router)**, **React**, **TypeScript** e **SCSS Modules**, simulando um ambiente real de produto com:

- Listagem de notícias  
- Página de detalhes  
- Persistência de favoritos  
- Autenticação simulada  
- Modal de login centralizado  
- Skeleton loading  
- Layout responsivo  
- SSR para melhorar SEO  

Este projeto foi desenvolvido como desafio técnico e implementado seguindo boas práticas modernas de frontend.

---

## 👤 **Autor**

### **Samuel Caetité**  
📧 **Email:** srcaetite@gmail.com  
📱 **Telefone:** +55 77 98157-0936  
🔗 **LinkedIn:** https://www.linkedin.com/in/samuelcaetite/

---

## 🚀 **Tecnologias Utilizadas**

| Tecnologia | Descrição |
|-----------|-----------|
| **Next.js 16 (Pages Router)** | Framework React com SSR/SSG |
| **React 19** | UI com componentes funcionais |
| **TypeScript** | Tipagem estática |
| **SCSS Modules** | Estilos isolados por componente |
| **Context API** | Estado global (Auth + LoginModal) |
| **LocalStorage** | Persistência de favoritos |
| **fetch API** | Consumo da API |
| **next/image** | Otimização de imagens |

---

## 📂 **Estrutura de Pastas**

```
/components
  /Header
  /Footer
  /NewsCard
  /NewsList
  /HorizontalNewsBanner
  /LoginModal
  /SkeletonNewsCard

/contexts
  AuthContext.tsx
  LoginModalContext.tsx

/hooks
  useAuth.ts
  useLoginModal.ts
  useFetchData.ts
  useFetchMultiple.ts

/pages
  index.tsx
  /admin
  /noticia/[id].tsx
  _app.tsx
  _document.tsx

/styles
  /abstracts
  /base
  main.scss

/public
  /img/jotalogo.svg
```

---

## 🧩 **Funcionalidades**

### ✔️ **Listagem de Notícias**
- SSR (`getStaticProps`)
- Card com título, categoria, timestamp e imagem
- Skeleton de carregamento
- Banner horizontal para a primeira notícia

---

### ✔️ **Página da Notícia**
- Conteúdo completo por ID
- Renderização via `getServerSideProps`
- Botão de favoritar
- Imagem em destaque com `next/image`
- Layout otimizado para leitura

---

### ✔️ **Favoritos**
- Persistência automática via `localStorage`
- Estado global via Context API
- Botões mudam dinamicamente (❤️ / 🤍)
- Página dedicada `/admin` listando favoritos

---

### ✔️ **Autenticação (simulada)**
- Login fake com token armazenado no localStorage
- Opção de logout
- Proteção de rotas (ex: página admin)
- Detecção de “usuário anônimo” ao tentar favoritar

---

### ✔️ **Login Modal (global)**
- Sistema de modal via Context global
- Aberto de qualquer lugar do app
- Bloqueia interação até fechar
- Estilização customizada

---

### ✔️ **Layout Responsivo**
- Mobile First  
- SCSS organizado em arquivos: variáveis, mixins e resets  
- Containers respeitando breakpoints  

---

## ⚙️ **Como Rodar o Projeto**

### **1. Instale as dependências**
```bash
npm install
```

### **2. Configure o arquivo de ambiente**
Crie `.env.local`:

```
NEXT_PUBLIC_API_NEWS_URL=https://69035749d0f10a340b23c2d5.mockapi.io
```

### **3. Execute em modo desenvolvimento**
```bash
npm run dev
```

### **4. Build de produção**
```bash
npm run build
npm start
```

---

## 🔧 **Scripts Disponíveis**

| Script | Ação |
|--------|-------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Executa o build |
| `npm run lint` | Analisa o código com ESLint |

---

## 🔍 **Decisões Técnicas Importantes**

### **SSR + CSR combinados**
- Página inicial usa SSG (melhor SEO)
- Página individual usa SSR, pois é dinâmica por ID
- Estados sensíveis ao client (favoritos/login) usam client-only render

### **Design System Simplificado**
- Variáveis SCSS para cores, fontes e breakpoints
- Mixins para responsividade
- Modules isolando estilo por componente

---

## 🔮 **Melhorias Futuras (Roadmap)**

- Scroll infinito  
- SEO avançado
- Testes automatizados


---

## 📄 **Licença**

MIT License.
