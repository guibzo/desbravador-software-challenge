import { LucideSearchX } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export const Empty = ({ title, description, actionLabel, onAction }: Props) => (
  <div
    className='border-border bg-card text-muted-foreground min-h-48 rounded-2xl px-6 flex flex-col items-center
      justify-center border border-dashed text-center'
  >
    <span className='bg-muted text-muted-foreground mb-3 size-11 flex items-center justify-center rounded-full'>
      <LucideSearchX size={21} />
    </span>

    <h2 className='text-foreground text-sm font-semibold'>{title}</h2>
    <p className='mt-1 max-w-sm text-sm'>{description}</p>

    {actionLabel && onAction && (
      <Button variant='outline' size='sm' className='mt-4' onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
)
