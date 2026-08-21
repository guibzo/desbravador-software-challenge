import { useQuery } from '@tanstack/react-query'

import { usegithub } from '@/hooks/use-github'
import type { GithubUser } from '@/types/github-user'

export const useGetGithubUser = (username: string) => {
  const { getUser } = usegithub()

  return useQuery<GithubUser>({
    queryKey: ['github-user', username],
    queryFn: ({ signal }) => getUser(username, signal),
    enabled: Boolean(username),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}
