import { useQuery } from '@tanstack/react-query'

import { usegithub } from '@/hooks/use-github'
import type { GithubRepository } from '@/types/github-repository'

export const useGetRepository = (owner: string, repository: string) => {
  const { getRepository } = usegithub()

  return useQuery<GithubRepository>({
    queryKey: ['github-repository', owner, repository],
    queryFn: ({ signal }) => getRepository(owner, repository, signal),
    enabled: Boolean(owner && repository),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}
