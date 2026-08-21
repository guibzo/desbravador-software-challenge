import { LucideSearch } from 'lucide-react'
import { type SubmitEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import githubIcon from '@/assets/icons/github-light.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  initialUsername?: string
  onSearch?: (username: string) => void
}

export const Header = ({ initialUsername = '', onSearch }: Props) => {
  const [username, setUsername] = useState(initialUsername)

  useEffect(() => setUsername(initialUsername), [initialUsername])

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = username.trim()
    if (value) onSearch?.(value)
  }

  return (
    <header className='border-border/80 bg-card/90 top-0 backdrop-blur-md sticky z-10 border-b'>
      <div className='max-w-7xl gap-4 px-6 py-4 max-sm:px-4 lg:px-8 container mx-auto flex flex-wrap items-center'>
        <Link to='/' className='text-foreground gap-2.5 font-bold tracking-tight flex items-center'>
          <span
            className='bg-primary text-primary-foreground size-9 rounded-xl shadow-sm flex items-center justify-center'
          >
            <img src={githubIcon} alt='' className='size-5' />
          </span>
          <span className='text-lg'>
            Repo<span className='text-primary'>Scout</span>
          </span>
        </Link>

        {onSearch && (
          <form
            onSubmit={handleSubmit}
            className='min-w-75 max-sm:order-3 max-sm:ml-0 max-sm:w-full max-sm:min-w-0 lg:min-w-95 order-0 ml-auto
              w-auto'
          >
            <label className='relative block'>
              <span className='sr-only'>Buscar usuário do GitHub</span>
              <LucideSearch
                className='text-muted-foreground left-3.5 pointer-events-none absolute top-1/2 -translate-y-1/2'
                size={17}
              />
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder='Buscar usuário do GitHub...'
                className='pr-20 pl-10'
              />
              <Button type='submit' size='sm' className='top-1 right-1 absolute'>
                Buscar
              </Button>
            </label>
          </form>
        )}
      </div>
    </header>
  )
}
