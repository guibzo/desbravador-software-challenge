import { useQuery } from '@tanstack/react-query'

import { getGithubUser, type GithubUser } from '@/lib/github'

export const useGetGithubUser = (username: string) =>
  useQuery<GithubUser>({
    queryKey: ['github-user', username],
    queryFn: ({ signal }) => getGithubUser(username, signal),
    enabled: Boolean(username),
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
