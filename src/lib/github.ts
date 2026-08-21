export type GithubUser = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  html_url: string
  blog: string
  company: string | null
  location: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export type GithubRepository = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  default_branch: string
  open_issues_count: number
  watchers_count: number
  size: number
  created_at: string
  updated_at: string
  pushed_at: string | null
  license: { name: string; spdx_id: string | null } | null
  owner: Pick<GithubUser, 'login' | 'avatar_url'>
}

export class GithubApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
  }
}

const githubRequest = async <T>(path: string, signal?: AbortSignal): Promise<T> => {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new GithubApiError('Usuário ou repositório não encontrado.', response.status)
    }

    if (response.status === 403) {
      throw new GithubApiError(
        'Limite de requisições da API do GitHub atingido. Tente novamente mais tarde.',
        response.status,
      )
    }

    throw new GithubApiError('Não foi possível consultar o GitHub agora.', response.status)
  }

  return response.json() as Promise<T>
}

export const getGithubUser = (username: string, signal?: AbortSignal) =>
  githubRequest<GithubUser>(`/users/${encodeURIComponent(username)}`, signal)

export const getGithubRepositories = async (username: string, signal?: AbortSignal) => {
  const repositories: GithubRepository[] = []
  const encodedUsername = encodeURIComponent(username)

  for (let page = 1; ; page += 1) {
    const pageRepositories = await githubRequest<GithubRepository[]>(
      `/users/${encodedUsername}/repos?per_page=100&page=${page}&type=all&sort=updated`,
      signal,
    )
    repositories.push(...pageRepositories)

    if (pageRepositories.length < 100) return repositories
  }
}

export const getGithubRepository = (owner: string, repository: string, signal?: AbortSignal) =>
  githubRequest<GithubRepository>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`, signal)

export const toGithubApiError = (error: unknown) =>
  error instanceof GithubApiError ? error : new GithubApiError('Não foi possível consultar o GitHub agora.', 0)

export const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(value)

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
