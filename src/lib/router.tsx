import { type MouseEvent, type ReactNode, useEffect, useState } from 'react'

export const navigate = (path: string) => {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

type LocationSnapshot = {
  pathname: string
  search: string
}

const getLocation = (): LocationSnapshot => ({ pathname: window.location.pathname, search: window.location.search })

export const useLocation = () => {
  const [location, setLocation] = useState(getLocation)

  useEffect(() => {
    const handlePopState = () => setLocation(getLocation())
    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return location
}

type LinkProps = {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Link = ({ href, children, className, onClick }: LinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    navigate(href)
    onClick?.()
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
