import { GithubApiError } from '@/types/github-api-error'
import type { GithubRepository } from '@/types/github-repository'
import type { GithubUser } from '@/types/github-user'

const githubRequest = async <Data>(path: string, signal?: AbortSignal): Promise<Data> => {
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

  return response.json() as Promise<Data>
}

const getUser = (username: string, signal?: AbortSignal) =>
  githubRequest<GithubUser>(`/users/${encodeURIComponent(username)}`, signal)

const getUserRepositories = async (username: string, signal?: AbortSignal) => {
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

const getRepository = (owner: string, repository: string, signal?: AbortSignal) =>
  githubRequest<GithubRepository>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`, signal)

export const usegithub = () => ({ getUser, getUserRepositories, getRepository })
