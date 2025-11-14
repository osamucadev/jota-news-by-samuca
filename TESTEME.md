# Desafio Técnico — JOTA Frontend

![JOTA](https://www.jota.info/images/meta/jotalogo.svg)

Bem-vindo ao Desafio Técnico Frontend da JOTA.  
O objetivo deste teste é avaliar sua capacidade de construir uma aplicação em Next.js com TypeScript, demonstrando boas práticas de organização, componentização, renderização e gerenciamento de estado.

---

## Ferramentas necessárias

- VSCode - https://code.visualstudio.com/
- Plugin: Pair Programming - https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare
- Node.js (npm) — versão mínima compatível com Next.js  

---

## Conhecimentos esperados

- TypeScript  
- Next.js (Pages Router)  
- State Management (Redux, Zustand, Context API ou Local Storage)  
- Bônus: SSR (Server-Side Rendering) ou ISR (Incremental Static Regeneration)  

---

## Objetivo do desafio

Criar um portal de notícias funcional com três áreas principais:

| Página | Caminho | Descrição |
|--------|----------|-----------|
| Home | `/` | Lista de todas as notícias |
| Notícia | `/noticia/[id]` | Página dinâmica com detalhes da notícia |
| Admin | `/admin` | Página privada com notícias favoritas |

---

## Tecnologias obrigatórias

- Next.js (usando Pages Router)  
- TypeScript  
- Gerenciamento de estado global (Redux, Zustand, Context API, etc.)  
- Consumo de API com fetch ou axios  
- Rotas dinâmicas com SSR ou ISR (diferencial)  
- Boas práticas de componentização e organização de pastas  

---

## API
https://69035749d0f10a340b23c2d5.mockapi.io/news


Endpoints disponíveis:

| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| GET | `/news` | Retorna todas as notícias |
| GET | `/news/:id` | Retorna uma notícia específica |

---

## Requisitos do desafio

### Página inicial (/)
- Buscar todos os dados da API GET /news e renderizar a lista de notícias.
- Exibir título, categoria e imagem para cada item com link para a página dinâmica respectiva.
- Incluir um botão "Simular Login" que gera e salva um token fake (por exemplo "fake-jwt-token") no estado global.
- Adicionar botões "Favoritar" nas notícias.
- O estado global deve armazenar: o token (de login simulado) e a lista de IDs das notícias favoritedas
- As ações de login e favoritos devem atualizar o estado em tempo real.
- O candidato é livre para definir como organizar visualmente as notícias (por exemplo, por categoria, data ou em cards).

### Página dinâmica (/noticia/[id])
- Exibir o conteúdo completo da notícia acessada. Exemplo: /noticia/12 deve mostrar a notícia com id = 12.
- Buscar os dados da API GET /news/:id.
- Exibir título, data, imagem e conteúdo da notícia.
- Exibir mensagem apropriada se o id não existir.
- A página deve ser renderizada usando SSR (Server-Side Rendering) ou ISR (Incremental Static Regeneration).
- O candidato deve explicar brevemente no código (em comentário) qual abordagem escolheu e por quê.


### Página privada (/admin)
- Exibir apenas as notícias que foram favoritedas pelo usuário.
- Se o usuário não estiver logado (sem token no estado global), redirecionar para /.
- Caso esteja logado, mostrar a lista de favoritos e uma mensagem de boas-vindas.
- Reaproveitar os mesmos componentes (NewsCard, NewsList) usados na página inicial.


O estado global deve conter:

```ts
{
  token: string | null;
  favorites: number[];
}
```

## Componentização
Crie e utilize componentes reutilizáveis, por exemplo:
- NewsCard — componente individual de notícia (título, resumo, botão de favorito)
- NewsList — lista genérica de notícias
- Layout — estrutura base da página (header, footer, main)

A ideia é avaliar sua organização e reutilização de código, não apenas funcionalidade.

## Estado Global
Você pode usar qualquer biblioteca ou abordagem para estado global (redux, zustand, context + usereducer ou até mesmo local storage):

O estado deve conter: 
```json
{ token: string | null; favorites: number[]; }
```

## Regra de Negócio
- Um usuário "logado" é aquele que possui um token armazenado.
- Ao clicar em "Simular Login", deve ser salvo o token fake no estado global.
- Ao clicar em "Favoritar", o ID deve ser adicionado/removido da lista de favoritos.
- A página /admin só é acessível se existir um token válido no estado.

