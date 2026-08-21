import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  error: Error | null
  onRetry?: () => void
}

export const ErrorState = ({ error, onRetry }: Props) => (
  <div
    className='border-destructive/20 bg-destructive/5 min-h-64 gap-3 rounded-2xl px-6 flex flex-col items-center
      justify-center border text-center'
  >
    <span className='bg-destructive/10 text-destructive size-11 flex items-center justify-center rounded-full'>
      <AlertCircle size={22} />
    </span>

    <div>
      <h2 className='text-foreground font-semibold'>Algo deu errado</h2>
      <p className='text-muted-foreground mt-1 max-w-md text-sm'>{error?.message ?? 'Tente novamente.'}</p>
    </div>

    {onRetry && (
      <Button variant='outline' size='sm' onClick={onRetry}>
        <RefreshCw size={15} /> Tentar novamente
      </Button>
    )}
  </div>
)
