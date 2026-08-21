import { useQuery } from '@tanstack/react-query'

import type { GithubUser } from '@/@types/github-user'
import { usegithub } from '@/hooks/use-github'

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
