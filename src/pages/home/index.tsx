import { LucideChevronDown } from 'lucide-react'

import type { GithubRepository } from '@/@types/github-repository'
import type { GithubUser } from '@/@types/github-user'
import { ErrorState } from '@/components/error-state'
import { Header } from '@/components/header'
import { Show } from '@/components/utils/show'
import type { GithubOrderBy } from '@/hooks/use-github-order-by'
import { Empty } from '@/pages/home/components/empty'
import { ProfileCard } from '@/pages/home/components/profile-card'
import { ProfileSkeleton } from '@/pages/home/components/profile-skeleton'
import { RepositoryCard } from '@/pages/home/components/repository-card'
import { RepositoriesSkeleton } from '@/pages/home/components/repositories-skeleton'
import { SearchForm } from '@/pages/home/components/search-form'
import { Welcome } from '@/pages/home/components/welcome'
import { useHome } from '@/pages/home/hooks/use-home'

const sortOptions: { value: GithubOrderBy; label: string }[] = [
  { value: 'stars', label: 'Mais estrelas' },
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'forks', label: 'Mais forks' },
  { value: 'updated', label: 'Mais recentes' },
]

type Props = {
  initialUsername?: string
}

export const Home = ({ initialUsername = '' }: Props) => {
  const { error, handleSearch, isLoading, orderBy, repositories, retry, setOrder, user, username } = useHome({
    initialUsername,
  })

  return (
    <div className='bg-background min-h-screen'>
      <Header initialUsername={initialUsername} onSearch={initialUsername ? handleSearch : undefined} />

      <main className='max-w-7xl max-sm:px-4 max-sm:py-8 px-6 py-10 lg:px-8 container mx-auto'>
        <Show when={!username}>
          <Welcome initialUsername={username} onSearch={handleSearch} />
        </Show>

        <Show when={Boolean(username && !initialUsername)}>
          <div className='mb-8 flex justify-center'>
            <SearchForm initialUsername={username} onSearch={handleSearch} />
          </div>
        </Show>

        <Show when={Boolean(username && isLoading)}>
          <div className='max-sm:gap-6 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] grid items-start'>
            <ProfileSkeleton />
            <RepositoriesSkeleton />
          </div>
        </Show>

        <Show when={Boolean(username && error)}>
          <ErrorState error={error} onRetry={retry} />
        </Show>

        <Show when={Boolean(user && !error && !isLoading)}>
          {user && (
            <RepositoriesContent orderBy={orderBy} repositories={repositories} setOrder={setOrder} user={user} />
          )}
        </Show>
      </main>
    </div>
  )
}

type RepositoriesContentProps = {
  orderBy: GithubOrderBy
  repositories: GithubRepository[]
  setOrder: (value: GithubOrderBy) => void
  user: GithubUser
}

const RepositoriesContent = ({ orderBy, repositories, setOrder, user }: RepositoriesContentProps) => (
  <div className='max-sm:gap-6 min-w-0 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] grid items-start'>
    <ProfileCard user={user} />

    <section className='min-w-0' aria-labelledby='repositories-heading'>
      <div className='mb-6 gap-4 sm:flex-row sm:items-end sm:justify-between flex flex-col'>
        <div>
          <p className='text-primary mb-2 text-xs font-bold tracking-[0.18em] uppercase'>Coleção pública</p>
          <h1 id='repositories-heading' className='text-2xl font-bold tracking-tight sm:text-3xl'>
            Repositórios de <span className='text-primary'>@{user.login}</span>
          </h1>
          <p className='text-muted-foreground mt-2 text-sm'>Encontre os projetos mais relevantes deste perfil.</p>
        </div>

        <label className='gap-2 max-sm:w-full max-sm:justify-between relative flex shrink-0 items-center'>
          <span className='text-muted-foreground text-xs font-medium'>Ordenar por</span>

          <span className='relative'>
            <select
              value={orderBy}
              onChange={(event) => setOrder(event.target.value as GithubOrderBy)}
              className='border-input bg-card text-foreground focus:border-primary focus:ring-primary/20 h-10 rounded-lg
                py-2 pr-9 pl-3 text-sm appearance-none border transition outline-none focus:ring-4'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <LucideChevronDown
              className='text-muted-foreground right-2.5 pointer-events-none absolute top-1/2 -translate-y-1/2'
              size={15}
            />
          </span>
        </label>
      </div>

      <Show
        when={repositories.length > 0}
        fallback={
          <Empty
            title='Nenhum repositório encontrado'
            description='Este usuário ainda não possui repositórios públicos.'
          />
        }
      >
        <div className='gap-4 xl:grid-cols-2 grid'>
          {repositories.map((repository) => (
            <RepositoryCard key={repository.id} repository={repository} />
          ))}
        </div>
      </Show>
    </section>
  </div>
)
