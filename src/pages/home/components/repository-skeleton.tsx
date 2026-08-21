import { Skeleton } from '@/components/ui/skeleton'

export const RepositorySkeleton = () => (
  <div className='border-border bg-card rounded-2xl p-6 shadow-sm max-sm:p-5 border'>
    <div className='gap-3 flex items-start'>
      <Skeleton className='size-8 rounded-lg shrink-0' />

      <div className='space-y-3 flex-1'>
        <Skeleton className='h-5 w-2/3' />
        <Skeleton className='h-10 w-full' />
      </div>
    </div>

    <Skeleton className='mt-5 h-5 w-24 rounded-full' />
    <Skeleton className='mt-6 h-4 w-full' />
  </div>
)
