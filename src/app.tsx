import { useLocation } from '@/lib/router'
import { Home } from '@/pages/home'
import { Repository } from '@/pages/repository'

const decodeSegment = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return ''
  }
}

export const App = () => {
  const location = useLocation()
  const repositoryMatch = location.pathname.match(/^\/repos\/([^/]+)\/([^/]+)\/?$/)

  if (repositoryMatch) {
    const owner = decodeSegment(repositoryMatch[1])
    const repository = decodeSegment(repositoryMatch[2])

    if (owner && repository) return <Repository owner={owner} repository={repository} />
  }

  return <Home />
}
