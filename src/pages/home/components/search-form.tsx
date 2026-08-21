import { type SubmitEvent, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  initialUsername: string
  onSearch: (username: string) => void
}

export const SearchForm = ({ initialUsername, onSearch }: Props) => {
  const [username, setUsername] = useState(initialUsername)

  useEffect(() => setUsername(initialUsername), [initialUsername])

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = username.trim()
    if (value) onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className='mt-8 max-w-lg gap-2 flex w-full'>
      <label className='flex-1'>
        <span className='sr-only'>Buscar usuário do GitHub</span>
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Digite um usuário, ex: guibzo'
        />
      </label>
      <Button type='submit'>Buscar</Button>
    </form>
  )
}
