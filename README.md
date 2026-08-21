# RepoScout

Desafio Front-End da Desbravador Software - Guilherme Viana: aplicação client-side para consultar usuários e repositórios públicos do GitHub.

## Executar

```bash
pnpm install
pnpm run dev
```

A aplicação utiliza a API pública do GitHub e não exige token.

## Funcionalidades

- Busca de usuários com avatar, bio, localização e estatísticas.
- Listagem de repositórios públicos ordenada por estrelas, nome, forks ou atualização.
- Ordenação persistida na URL através do parâmetro `orderBy`.
- Detalhes do repositório com métricas, tópicos e link para o GitHub.
- Estados de carregamento com skeletons, erros e ausência de resultados.
- Layout responsivo.

## Rotas

- `/` — página inicial e busca.
- `/users/:username` — repositórios e informações do usuário.
- `/repos/:owner/:repository` — detalhes do repositório.

## Stack

React, TypeScript 7, Vite, Tailwind CSS, TanStack Query, React Router DOM, nuqs e Fetch API.
