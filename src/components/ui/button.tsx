import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  `gap-2 rounded-lg text-sm font-medium focus-visible:ring-ring/50 [&_svg]:size-4 inline-flex shrink-0 items-center
  justify-center whitespace-nowrap transition outline-none focus-visible:ring-2 disabled:pointer-events-none
  disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        outline: 'border-border bg-background text-foreground shadow-sm hover:bg-accent border',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type Props = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = ({ className, variant, size, asChild = false, ...props }: Props) => {
  const Component = asChild ? Slot : 'button'

  return <Component className={cn(buttonVariants({ variant, size, className }))} {...props} />
}
