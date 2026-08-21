import { useQuery } from '@tanstack/react-query'

import { getGithubRepositories, type GithubRepository } from '@/lib/github'

export const useGetUserRepositories = (username: string) =>
  useQuery<GithubRepository[]>({
    queryKey: ['github-user-repositories', username],
    queryFn: ({ signal }) => getGithubRepositories(username, signal),
    enabled: Boolean(username),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
