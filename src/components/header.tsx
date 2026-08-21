import { LucideCode2, Search } from 'lucide-react'
import { type SubmitEvent, useEffect, useState } from 'react'

import { Link } from '@/lib/router'

type Props = {
  initialUsername?: string
  onSearch: (username: string) => void
}

export const Header = ({ initialUsername = '', onSearch }: Props) => {
  const [username, setUsername] = useState(initialUsername)

  useEffect(() => setUsername(initialUsername), [initialUsername])

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = username.trim()
    if (value) onSearch(value)
  }

  return (
    <header className='border-border/80 bg-card/90 top-0 backdrop-blur-md sticky z-10 border-b'>
      <div className='max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:px-8 container mx-auto flex flex-wrap items-center'>
        <Link href='/' className='text-foreground gap-2.5 font-bold tracking-tight flex items-center'>
          <span
            className='bg-primary text-primary-foreground size-9 rounded-xl shadow-sm flex items-center justify-center'
          >
            <LucideCode2 size={20} strokeWidth={2.5} />
          </span>

          <span className='text-lg'>
            Repo<span className='text-primary'>Scout</span>
          </span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className='sm:order-0 sm:ml-auto sm:w-auto sm:min-w-75 lg:min-w-95 order-3 w-full'
        >
          <label className='relative block'>
            <span className='sr-only'>Buscar usuário do GitHub</span>
            <Search
              className='text-muted-foreground left-3.5 pointer-events-none absolute top-1/2 -translate-y-1/2'
              size={17}
            />

            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder='Buscar usuário do GitHub...'
              className='border-input bg-background placeholder:text-muted-foreground focus:border-primary
                focus:ring-primary/20 h-10 rounded-lg py-2 pr-20 pl-10 text-sm w-full border transition outline-none
                focus:ring-4'
            />

            <button
              type='submit'
              className='bg-primary text-primary-foreground hover:bg-primary/90 top-1 right-1 h-8 rounded-md px-3
                text-xs font-semibold absolute transition-colors'
            >
              Buscar
            </button>
          </label>
        </form>
      </div>
    </header>
  )
}
