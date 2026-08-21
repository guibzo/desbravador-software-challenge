import { Skeleton } from '@/components/ui/skeleton'

export const ProfileSkeleton = () => (
  <div className='border-border bg-card rounded-2xl p-5 shadow-sm sm:p-6 border'>
    <div className='gap-4 flex items-start'>
      <Skeleton className='size-20 rounded-2xl sm:size-24' />
      <div className='space-y-2 pt-2 flex-1'>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-4 w-20' />
      </div>
    </div>

    <Skeleton className='mt-5 h-10 w-full' />

    <div className='border-border mt-6 gap-3 py-4 grid grid-cols-3 border-y'>
      <Skeleton className='h-9 w-14 mx-auto' />
      <Skeleton className='h-9 w-14 mx-auto' />
      <Skeleton className='h-9 w-14 mx-auto' />
    </div>

    <div className='mt-5 space-y-3'>
      <Skeleton className='h-4 w-3/4' />
      <Skeleton className='h-4 w-1/2' />
      <Skeleton className='h-4 w-2/3' />
    </div>
  </div>
)
