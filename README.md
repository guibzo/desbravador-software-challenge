# RepoScout

Aplicação client-side para explorar usuários e repositórios públicos do GitHub.

## Executar localmente

```bash
pnpm install
pnpm dev
```

A aplicação usa a API pública do GitHub, sem necessidade de configurar uma chave.

## Funcionalidades

- Busca de usuários do GitHub com avatar, bio, estatísticas e links públicos.
- Lista de repositórios ordenada por estrelas, nome, forks ou data de atualização.
- Página de detalhes com métricas, tópicos e link para o repositório no GitHub.
- Rotas client-side para home (`/`), usuário (`/users/:username`) e repositório (`/repos/:owner/:repository`).
- Layout responsivo.

## Tecnologias

React, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router DOM, hook de debounce próprio e Fetch API.
