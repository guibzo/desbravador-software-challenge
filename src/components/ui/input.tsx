import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      `border-input bg-background placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-10
      rounded-lg px-3 text-sm w-full border transition outline-none focus:ring-4`,
      className,
    )}
    {...props}
  />
))
