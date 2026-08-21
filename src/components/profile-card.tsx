import { Building2, CalendarDays, Link2, MapPin, Users } from 'lucide-react'

import { formatDate, formatNumber, type GithubUser } from '@/lib/github'

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
    <aside className='border-border bg-card rounded-2xl p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 h-fit border'>
      <div className='gap-4 flex items-start'>
        <img
          src={user.avatar_url}
          alt={`Avatar de ${user.login}`}
          className='size-20 rounded-2xl ring-primary/10 sm:size-24 ring-4'
        />
        <div className='min-w-0 pt-1'>
          <h2 className='text-xl font-bold tracking-tight truncate'>{user.name || user.login}</h2>
          <a
            href={user.html_url}
            target='_blank'
            rel='noreferrer'
            className='text-primary mt-0.5 text-sm inline-block hover:underline'
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
            <MapPin className='text-primary shrink-0' size={16} />
            <span>{user.location}</span>
          </p>
        )}
        {user.company && (
          <p className='gap-2.5 flex items-center'>
            <Building2 className='text-primary shrink-0' size={16} />
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
            <Link2 className='text-primary shrink-0' size={16} />
            <span className='truncate'>{user.blog}</span>
          </a>
        )}
        <p className='gap-2.5 flex items-center'>
          <CalendarDays className='text-primary shrink-0' size={16} />
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
        <Users size={16} /> Ver perfil no GitHub
      </a>
    </aside>
  )
}
