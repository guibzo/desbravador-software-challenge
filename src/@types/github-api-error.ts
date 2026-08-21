export class GithubApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
  }
}
