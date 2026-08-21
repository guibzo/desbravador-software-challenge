import {
  LucideCalendarDays,
  LucideCode2,
  LucideExternalLink,
  LucideGitBranch,
  LucideGitFork,
  LucideScale,
  LucideStar,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { formatDate, formatNumber } from '@/lib/format'
import type { GithubRepository } from '@/types/github-repository'

export const RepositoryDetails = ({ repository }: { repository: GithubRepository }) => (
  <article>
    <div className='border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8 border'>
      <div className='gap-6 sm:flex-row sm:items-start sm:justify-between flex flex-col'>
        <div className='gap-4 flex items-start'>
          <span className='bg-primary/10 text-primary size-12 rounded-xl flex shrink-0 items-center justify-center'>
            <LucideCode2 size={24} />
          </span>
          <div className='min-w-0'>
            <p className='text-muted-foreground mb-1 text-sm'>{repository.owner.login} /</p>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl break-all'>{repository.name}</h1>
            <p className='text-muted-foreground mt-3 max-w-2xl leading-6'>
              {repository.description || 'Este repositório não possui uma descrição.'}
            </p>
          </div>
        </div>
        <Button asChild variant='outline' className='sm:w-auto w-full'>
          <a href={repository.html_url} target='_blank' rel='noreferrer'>
            <LucideExternalLink size={16} /> Abrir no GitHub
          </a>
        </Button>
      </div>

      <div className='mt-8 gap-2 flex flex-wrap'>
        {repository.topics.map((topic) => (
          <span key={topic} className='bg-primary/10 text-primary px-3 py-1.5 text-xs font-medium rounded-full'>
            {topic}
          </span>
        ))}
      </div>

      <div className='border-border mt-8 sm:grid-cols-4 sm:divide-y-0 grid grid-cols-2 divide-x divide-y border-y'>
        <Stat icon={<LucideStar size={17} />} value={formatNumber(repository.stargazers_count)} label='estrelas' />
        <Stat icon={<LucideGitFork size={17} />} value={formatNumber(repository.forks_count)} label='forks' />
        <Stat icon={<LucideGitBranch size={17} />} value={repository.default_branch} label='branch padrão' />
        <Stat icon={<LucideScale size={17} />} value={repository.license?.spdx_id || 'Sem licença'} label='licença' />
      </div>

      <div className='text-muted-foreground mt-7 gap-x-6 gap-y-3 text-sm flex flex-wrap'>
        <span className='gap-2 flex items-center'>
          <LucideCalendarDays className='text-primary' size={16} /> Atualizado em {formatDate(repository.updated_at)}
        </span>
        <span className='gap-2 flex items-center'>Criado em {formatDate(repository.created_at)}</span>
        {repository.language && (
          <span className='gap-2 flex items-center'>
            <span className='bg-primary size-2 rounded-full' /> {repository.language}
          </span>
        )}
      </div>
    </div>

    <div className='mt-5 gap-5 sm:grid-cols-3 grid'>
      <InfoCard label='Issues abertas' value={formatNumber(repository.open_issues_count)} />
      <InfoCard label='Observadores' value={formatNumber(repository.watchers_count)} />
      <InfoCard label='Tamanho do projeto' value={`${formatNumber(repository.size)} KB`} />
    </div>
  </article>
)

const Stat = ({ icon, value, label }: { icon: ReactNode; value: string; label: string }) => (
  <div className='min-w-0 gap-3 px-3 py-4 sm:px-5 flex items-center'>
    <span className='text-primary shrink-0'>{icon}</span>
    <div className='min-w-0'>
      <p className='text-foreground text-sm font-bold truncate'>{value}</p>
      <p className='text-muted-foreground text-xs truncate'>{label}</p>
    </div>
  </div>
)

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className='border-border bg-card rounded-xl p-5 shadow-sm border'>
    <p className='text-muted-foreground text-xs'>{label}</p>
    <p className='text-foreground mt-2 text-xl font-bold'>{value}</p>
  </div>
)
