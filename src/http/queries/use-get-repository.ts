import { useQuery } from '@tanstack/react-query'

import { getGithubRepository, type GithubRepository } from '@/lib/github'

export const useGetRepository = (owner: string, repository: string) =>
  useQuery<GithubRepository>({
    queryKey: ['github-repository', owner, repository],
    queryFn: ({ signal }) => getGithubRepository(owner, repository, signal),
    enabled: Boolean(owner && repository),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
