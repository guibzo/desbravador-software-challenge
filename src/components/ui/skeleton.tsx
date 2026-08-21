import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />
)
