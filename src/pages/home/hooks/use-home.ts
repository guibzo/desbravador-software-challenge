import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGithubOrderBy, type GithubOrderBy } from '@/hooks/use-github-order-by'
import { useGetGithubUser } from '@/http/queries/use-get-github-user'
import { useGetUserRepositories } from '@/http/queries/use-get-user-repositories'

type Props = {
  initialUsername?: string
}

export const useHome = ({ initialUsername = '' }: Props = {}) => {
  const [username, setUsername] = useState(initialUsername)
  const [orderBy, setOrderBy] = useGithubOrderBy()
  const navigate = useNavigate()

  useEffect(() => setUsername(initialUsername), [initialUsername])

  const userQuery = useGetGithubUser(username)
  const repositoriesQuery = useGetUserRepositories(username)
  const user = userQuery.data
  const error = userQuery.error ?? repositoriesQuery.error
  const isLoading = userQuery.isPending || repositoriesQuery.isPending

  const repositories = useMemo(() => {
    if (!repositoriesQuery.data) return []

    return [...repositoriesQuery.data].sort((first, second) => {
      if (orderBy === 'name') return first.name.localeCompare(second.name)
      if (orderBy === 'forks') return second.forks_count - first.forks_count
      if (orderBy === 'updated') return new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime()
      return second.stargazers_count - first.stargazers_count
    })
  }, [orderBy, repositoriesQuery.data])

  const handleSearch = (value: string) => {
    const normalizedValue = value.trim()
    if (!normalizedValue) return

    setUsername(normalizedValue)
    navigate(`/users/${encodeURIComponent(normalizedValue)}`)
  }

  const retry = () => {
    void userQuery.refetch()
    void repositoriesQuery.refetch()
  }

  const setOrder = (value: GithubOrderBy) => {
    void setOrderBy(value)
  }

  return {
    error,
    handleSearch,
    isLoading,
    orderBy,
    repositories,
    retry,
    setOrder,
    user,
    username,
  }
}
