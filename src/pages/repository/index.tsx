import { LucideArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { ErrorState } from '@/components/page-state'
import { useGetRepository } from '@/http/queries/use-get-repository'
import { RepositoryDetails } from '@/pages/repository/components/repository-details'
import { RepositoryDetailsSkeleton } from '@/pages/repository/components/repository-details-skeleton'

type Props = {
  owner: string
  repository: string
}

export const Repository = ({ owner, repository }: Props) => {
  const navigate = useNavigate()
  const { data, isPending, error, refetch } = useGetRepository(owner, repository)

  return (
    <div className='bg-background min-h-screen'>
      <Header onSearch={(username) => navigate(`/users/${encodeURIComponent(username)}`)} />
      <main className='max-w-5xl px-6 py-12 max-sm:px-4 max-sm:py-8 lg:px-8 container mx-auto'>
        <Link
          to={`/users/${encodeURIComponent(owner)}`}
          className='text-muted-foreground hover:text-primary mb-8 gap-2 text-sm font-medium inline-flex items-center
            transition-colors'
        >
          <LucideArrowLeft size={16} /> Voltar para a busca
        </Link>

        {isPending && <RepositoryDetailsSkeleton />}
        {error && <ErrorState error={error} onRetry={() => void refetch()} />}
        {data && <RepositoryDetails repository={data} />}
      </main>
    </div>
  )
}
