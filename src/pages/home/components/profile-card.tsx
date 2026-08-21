import { LucideBuilding2, LucideCalendarDays, LucideLink2, LucideMapPin, LucideUsers } from 'lucide-react'

import { formatDate, formatNumber } from '@/lib/format'
import type { GithubUser } from '@/types/github-user'

type Props = {
  user: GithubUser
}

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div>
    <p className='text-foreground text-lg font-bold'>{formatNumber(value)}</p>
    <p className='text-muted-foreground text-xs'>{label}</p>
  </div>
)

export const ProfileCard = ({ user }: Props) => {
  const website = user.blog ? (user.blog.startsWith('http') ? user.blog : `https://${user.blog}`) : null

  return (
    <aside className='border-border bg-card rounded-2xl p-6 shadow-sm max-sm:p-5 lg:sticky lg:top-24 h-fit border'>
      <div className='flex flex-col items-center text-center'>
        <img
          src={user.avatar_url}
          alt={`Avatar de ${user.login}`}
          className='size-24 rounded-2xl ring-primary/10 max-sm:size-20 ring-4'
        />

        <div className='mt-4 min-w-0 max-w-full'>
          <h2 className='text-xl font-bold tracking-tight wrap-break-word'>{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target='_blank'
            rel='noreferrer'
            className='text-primary mt-0.5 text-sm inline-block break-all hover:underline'
          >
            @{user.login}
          </a>
        </div>
      </div>

      {user.bio && <p className='text-muted-foreground mt-5 text-sm leading-6'>{user.bio}</p>}

      <div className='border-border mt-6 py-4 grid grid-cols-3 divide-x border-y text-center'>
        <Stat value={user.public_repos} label='repositórios' />
        <Stat value={user.followers} label='seguidores' />
        <Stat value={user.following} label='seguindo' />
      </div>

      <div className='text-muted-foreground mt-5 space-y-3 text-sm'>
        {user.location && (
          <p className='gap-2.5 flex items-center'>
            <LucideMapPin className='text-primary shrink-0' size={16} />
            <span>{user.location}</span>
          </p>
        )}
        {user.company && (
          <p className='gap-2.5 flex items-center'>
            <LucideBuilding2 className='text-primary shrink-0' size={16} />
            <span>{user.company}</span>
          </p>
        )}
        {website && (
          <a
            href={website}
            target='_blank'
            rel='noreferrer'
            className='hover:text-primary gap-2.5 flex items-center transition-colors'
          >
            <LucideLink2 className='text-primary shrink-0' size={16} />
            <span className='truncate'>{user.blog}</span>
          </a>
        )}
        <p className='gap-2.5 flex items-center'>
          <LucideCalendarDays className='text-primary shrink-0' size={16} />
          <span>Entrou em {formatDate(user.created_at)}</span>
        </p>
      </div>

      <a
        href={user.html_url}
        target='_blank'
        rel='noreferrer'
        className='border-border text-foreground hover:bg-accent mt-6 h-10 gap-2 rounded-lg text-sm font-medium flex
          items-center justify-center border transition-colors'
      >
        <LucideUsers size={16} /> Ver perfil no GitHub
      </a>
    </aside>
  )
}
