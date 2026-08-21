import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

const containerVariants = cva('container-padding mx-auto w-full flex-1', {
  variants: {
    size: {
      default: 'max-w-7xl',
      auth: 'max-w-md',
      small: 'max-w-205',
      medium: 'max-w-5xl',
      full: 'max-w-full',
    },
    variant: {
      default: '',
      auth: 'centered gap-6 flex flex-col',
    },
  },
})

type Props = {
  children: ReactNode
  className?: string
} & VariantProps<typeof containerVariants>

export const ContentContainer = ({ children, size = 'default', variant = 'default', className }: Props) => {
  return <div className={cn(containerVariants({ size, variant }), className)}>{children}</div>
}
