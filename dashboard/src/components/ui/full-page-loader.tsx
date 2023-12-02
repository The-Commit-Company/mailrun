import { Loader } from '@/components/ui/loader'
import { cn } from '@/lib/utils'
import React from 'react'

export const FullPageLoader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children = "Loading...", ...props }, ref) => (
    <div ref={ref} className={cn('flex justify-center items-center h-screen w-full', className)} {...props}>
        <div className='justify-center items-center gap-2 flex flex-row'>
            <Loader />
            <span className='text-sm text-muted-foreground'>{children}</span>
        </div>
    </div>
))