import { LucideSearch } from 'lucide-react'

import { SearchForm } from '@/pages/home/components/search-form'

type Props = {
  initialUsername: string
  onSearch: (username: string) => void
}

export const Welcome = ({ initialUsername, onSearch }: Props) => (
  <section className='max-w-2xl px-4 py-24 max-sm:py-16 mx-auto flex flex-col items-center text-center'>
    <div className='bg-primary/10 text-primary mb-6 size-16 rounded-2xl flex items-center justify-center'>
      <LucideSearch size={30} />
    </div>

    <p className='text-primary mb-3 text-xs font-bold tracking-[0.2em] uppercase'>
      Explorador de código - Guilherme Viana
    </p>
    <h1 className='text-5xl font-bold tracking-tight max-sm:text-3xl'>RepoScout</h1>
    <p className='text-muted-foreground mt-5 max-w-lg leading-7'>
      Pesquise um usuário do GitHub e explore seus projetos, tecnologias e repositórios.
    </p>
    <SearchForm initialUsername={initialUsername} onSearch={onSearch} />
  </section>
)
