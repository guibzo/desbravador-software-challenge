import { LucideExternalLink, LucideGitFork, LucideStar } from 'lucide-react'
import { Link } from 'react-router-dom'

import { formatDate, formatNumber } from '@/lib/format'
import type { GithubRepository } from '@/types/github-repository'

type Props = {
  repository: GithubRepository
}

export const RepositoryCard = ({ repository }: Props) => (
  <article
    className='border-border bg-card group rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md sm:p-6 flex
      h-full flex-col border transition duration-200'
  >
    <div className='gap-4 flex items-start justify-between'>
      <div className='min-w-0'>
        <Link
          to={`/repos/${repository.owner.login}/${repository.name}`}
          className='text-foreground group-hover:text-primary gap-2 text-base font-bold flex items-center truncate
            transition-colors'
        >
          <span className='bg-primary/10 text-primary size-8 rounded-lg flex shrink-0 items-center justify-center'>
            <span className='text-sm'>⌘</span>
          </span>

          <span className='truncate'>{repository.name}</span>
        </Link>

        <p className='text-muted-foreground mt-3 min-h-10 text-sm leading-5 line-clamp-2'>
          {repository.description || 'Este repositório não possui uma descrição.'}
        </p>
      </div>

      <a
        href={repository.html_url}
        target='_blank'
        rel='noreferrer'
        aria-label={`Abrir ${repository.name} no GitHub`}
        className='text-muted-foreground hover:text-primary shrink-0 transition-colors'
      >
        <LucideExternalLink size={17} />
      </a>
    </div>

    {repository.topics.length > 0 && (
      <div className='mt-5 gap-1.5 flex flex-wrap'>
        {repository.topics.slice(0, 3).map((topic) => (
          <span key={topic} className='bg-primary/10 text-primary px-2.5 py-1 font-medium rounded-full text-[11px]'>
            {topic}
          </span>
        ))}
      </div>
    )}

    <div className='text-muted-foreground gap-x-4 gap-y-2 pt-6 text-xs mt-auto flex flex-wrap items-center'>
      {repository.language && (
        <span className='text-foreground gap-1.5 font-medium flex items-center'>
          <span className='bg-primary size-2 rounded-full' /> {repository.language}
        </span>
      )}

      <span className='gap-1 flex items-center'>
        <LucideStar size={14} /> {formatNumber(repository.stargazers_count)}
      </span>

      <span className='gap-1 flex items-center'>
        <LucideGitFork size={14} /> {formatNumber(repository.forks_count)}
      </span>

      <span className='ml-auto'>Atualizado {formatDate(repository.updated_at)}</span>
    </div>
  </article>
)
