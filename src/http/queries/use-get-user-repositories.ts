import { useQuery } from '@tanstack/react-query'

import type { GithubRepository } from '@/@types/github-repository'
import { usegithub } from '@/hooks/use-github'

export const useGetUserRepositories = (username: string) => {
  const { getUserRepositories } = usegithub()

  return useQuery<GithubRepository[]>({
    queryKey: ['github-user-repositories', username],
    queryFn: ({ signal }) => getUserRepositories(username, signal),
    enabled: Boolean(username),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}
