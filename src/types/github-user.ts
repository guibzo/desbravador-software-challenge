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
