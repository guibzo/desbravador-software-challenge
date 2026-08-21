import type { ReactNode } from 'react'

interface Props<T> {
  when: T
  fallback?: ReactNode
  children: ReactNode | ((item: NonNullable<T>) => ReactNode)
}

const Show = <T,>({ when: condition, fallback = null, children }: Props<T>) => {
  if (!condition) return <>{fallback}</>

  return typeof children === 'function' ? children(condition as NonNullable<T>) : children
}

export { Show }
