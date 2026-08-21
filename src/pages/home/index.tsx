import { ChevronDown, LucideSearch } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Empty } from '@/components/empty'
import { Header } from '@/components/header'
import { ErrorState } from '@/components/page-state'
import { ProfileCard } from '@/components/profile-card'
import { RepositoryCard } from '@/components/repository-card'
import { ProfileSkeleton } from '@/components/skeletons/profile-skeleton'
import { RepositorySkeleton } from '@/components/skeletons/repository-skeleton'
import { useGetGithubUser } from '@/http/queries/use-get-github-user'
import { useGetUserRepositories } from '@/http/queries/use-get-user-repositories'
import { navigate, useLocation } from '@/lib/router'

type SortOption = 'stars' | 'name' | 'forks' | 'updated'

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'stars', label: 'Mais estrelas' },
  { value: 'name', label: 'Nome (A–Z)' },
  { value: 'forks', label: 'Mais forks' },
  { value: 'updated', label: 'Mais recentes' },
]

const getInitialUsername = () => new URLSearchParams(window.location.search).get('user')?.trim() ?? ''

export const Home = () => {
  const location = useLocation()
  const [username, setUsername] = useState(getInitialUsername)
  const [sort, setSort] = useState<SortOption>('stars')
  const [debouncedUsername] = useDebounce(username, 400)

  useEffect(() => {
    setUsername(new URLSearchParams(location.search).get('user')?.trim() ?? '')
  }, [location.search])

  const userQuery = useGetGithubUser(debouncedUsername)
  const repositoriesQuery = useGetUserRepositories(debouncedUsername)
  const user = userQuery.data
  const error = userQuery.error ?? repositoriesQuery.error
  const isLoading = userQuery.isPending || repositoriesQuery.isPending

  const repositories = useMemo(() => {
    if (!repositoriesQuery.data) return []

    return [...repositoriesQuery.data].sort((first, second) => {
      if (sort === 'name') return first.name.localeCompare(second.name)
      if (sort === 'forks') return second.forks_count - first.forks_count
      if (sort === 'updated') return new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime()
      return second.stargazers_count - first.stargazers_count
    })
  }, [repositoriesQuery.data, sort])

  const handleSearch = (value: string) => {
    setUsername(value)
    navigate(`/?user=${encodeURIComponent(value)}`)
  }

  return (
    <div className='bg-background min-h-screen'>
      <Header initialUsername={username} onSearch={handleSearch} />

      <main className='max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 container mx-auto'>
        {!username && <Welcome />}

        {username && isLoading && (
          <div className='gap-8 lg:grid-cols-[280px_minmax(0,1fr)] grid items-start'>
            <ProfileSkeleton />
            <section className='gap-4 xl:grid-cols-2 grid'>
              {Array.from({ length: 6 }, (_, index) => (
                <RepositorySkeleton key={index} />
              ))}
            </section>
          </div>
        )}

        {username && error && (
          <ErrorState
            error={error}
            onRetry={() => {
              void userQuery.refetch()
              void repositoriesQuery.refetch()
            }}
          />
        )}

        {user && !error && (
          <div className='gap-8 lg:grid-cols-[280px_minmax(0,1fr)] grid items-start'>
            <ProfileCard user={user} />

            <section aria-labelledby='repositories-heading'>
              <div className='mb-6 gap-4 sm:flex-row sm:items-end sm:justify-between flex flex-col'>
                <div>
                  <p className='text-primary mb-2 text-xs font-bold tracking-[0.18em] uppercase'>Coleção pública</p>
                  <h1 id='repositories-heading' className='text-2xl font-bold tracking-tight sm:text-3xl'>
                    Repositórios de <span className='text-primary'>@{user.login}</span>
                  </h1>
                  <p className='text-muted-foreground mt-2 text-sm'>
                    Encontre os projetos mais relevantes deste perfil.
                  </p>
                </div>
                <label className='gap-2 relative flex shrink-0 items-center'>
                  <span className='text-muted-foreground text-xs font-medium'>Ordenar por</span>
                  <span className='relative'>
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortOption)}
                      className='border-input bg-card text-foreground focus:border-primary focus:ring-primary/20 h-10
                        rounded-lg py-2 pr-9 pl-3 text-sm appearance-none border transition outline-none focus:ring-4'
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className='text-muted-foreground right-2.5 pointer-events-none absolute top-1/2 -translate-y-1/2'
                      size={15}
                    />
                  </span>
                </label>
              </div>

              {repositories.length > 0 ? (
                <div className='gap-4 xl:grid-cols-2 grid'>
                  {repositories.map((repository) => (
                    <RepositoryCard key={repository.id} repository={repository} />
                  ))}
                </div>
              ) : (
                <Empty
                  title='Nenhum repositório encontrado'
                  description='Este usuário ainda não possui repositórios públicos.'
                />
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

const Welcome = () => (
  <section className='max-w-2xl px-4 py-16 sm:py-24 mx-auto flex flex-col items-center text-center'>
    <div className='bg-primary/10 text-primary mb-6 size-16 rounded-2xl flex items-center justify-center'>
      <LucideSearch size={30} />
    </div>

    <p className='text-primary mb-3 text-xs font-bold tracking-[0.2em] uppercase'>Explorador de código</p>
    <h1 className='text-3xl font-bold tracking-tight sm:text-5xl'>RepoScout</h1>
    <p className='text-muted-foreground mt-5 max-w-lg leading-7'>
      Pesquise um usuário do GitHub e explore seus projetos, tecnologias e repositórios.
    </p>
  </section>
)
