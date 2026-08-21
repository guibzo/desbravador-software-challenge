import type { GithubUser } from './github-user'

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
