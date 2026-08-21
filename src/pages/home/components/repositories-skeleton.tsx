import { Skeleton } from '@/components/ui/skeleton'
import { RepositorySkeleton } from '@/pages/home/components/repository-skeleton'

export const RepositoriesSkeleton = () => (
  <section className='min-w-0'>
    <div className='mb-6 gap-4 sm:flex-row sm:items-end sm:justify-between flex flex-col'>
      <div className='space-y-2'>
        <Skeleton className='h-3 w-28' />
        <Skeleton className='h-8 w-72 max-w-full' />
        <Skeleton className='h-4 w-80 max-w-full' />
      </div>
      <div className='gap-2 max-sm:w-full max-sm:justify-between flex items-center'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-10 w-36' />
      </div>
    </div>

    <div className='gap-4 xl:grid-cols-2 grid'>
      {Array.from({ length: 6 }, (_, index) => (
        <RepositorySkeleton key={index} />
      ))}
    </div>
  </section>
)
