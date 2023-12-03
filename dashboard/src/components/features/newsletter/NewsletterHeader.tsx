import { Button } from '@/components/ui/button'
import { Newsletter } from '@/types/Newsletter'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

interface NewsletterHeaderProps {
    newsletter?: Newsletter
}

export const NewsletterHeader = ({ newsletter }: NewsletterHeaderProps) => {
    return (
        <div className='fixed w-screen flex h-14 justify-between bg-gray-950 p-2 items-center'>
            <div className='absolute left-2'>
                <Button variant='link' asChild size='icon'>
                    <Link to='/newsletters'>
                        <ArrowLeft className='h-5 w-5 text-gray-300' />
                    </Link>
                </Button>
            </div>
            <div className='text-center w-screen'>
                <h1 className='text-sm font-medium text-gray-200 text-center'>{newsletter?.subject ?? "Untitled"}</h1>
            </div>
            <div className='absolute right-2 flex items-center gap-2'>
                <Button size='sm' className='bg-gray-800 border border-gray-700 font-semibold text-gray-300 hover:bg-gray-700 hover:border-gray-600'>Test Email</Button>
                <Button size='sm' className='bg-white font-semibold text-gray-900 hover:bg-gray-100'>Send</Button>
                <Button size='sm' className='bg-white font-semibold text-gray-900 hover:bg-gray-100'>Save as Draft</Button>
            </div>
        </div>
    )
}