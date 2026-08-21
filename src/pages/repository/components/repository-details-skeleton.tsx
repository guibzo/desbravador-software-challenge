import { Skeleton } from '@/components/ui/skeleton'
import { repeat } from '@/utils/repeat'

export const RepositoryDetailsSkeleton = () => (
  <div className='border-border bg-card rounded-2xl p-6 shadow-sm sm:p-8 border'>
    <div className='gap-4 flex items-start'>
      <Skeleton className='size-12 rounded-xl shrink-0' />
      <div className='space-y-3 flex-1'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-8 w-64 max-w-full' />
        <Skeleton className='h-5 max-w-xl w-full' />
      </div>
    </div>

    <Skeleton className='mt-8 h-10 w-full' />

    <div className='border-border mt-8 gap-4 py-5 sm:grid-cols-4 grid grid-cols-2 border-y'>
      {repeat(4, (index) => (
        <Skeleton key={index} className='h-10 w-full' />
      ))}
    </div>
  </div>
)
