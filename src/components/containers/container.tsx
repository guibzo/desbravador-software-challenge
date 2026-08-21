import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Props = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return <div className={cn('flex min-h-screen w-full flex-col', className)}>{children}</div>
}
