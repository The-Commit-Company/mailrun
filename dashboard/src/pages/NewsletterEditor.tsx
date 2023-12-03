import Editor from '@/components/features/editor'
import { NewsletterHeader } from '@/components/features/newsletter/NewsletterHeader'
import { ErrorBanner } from '@/components/layout/ErrorBanner'
import { FullPageLoader } from '@/components/ui/full-page-loader'
import { Newsletter } from '@/types/Newsletter'
import { useFrappeGetDoc } from 'frappe-react-sdk'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Editor as EditorClass } from "@tiptap/core";

export const NewsletterEditor = () => {

    const { id } = useParams<{ id: string }>()

    const { data, isLoading, error } = useFrappeGetDoc('Newsletter', id)
    return (
        <div>
            <ErrorBanner error={error} />
            {isLoading && <FullPageLoader />}
            {data && <NewsletterEditorContent newsletter={data} />}
        </div>
    )
}


const NewsletterEditorContent = ({ newsletter }: { newsletter: Newsletter }) => {

    const methods = useForm<Newsletter>()

    const onSubmit = (data: Newsletter) => {
        console.log(data)
    }

    const onEditorUpdate = (editor?: EditorClass) => {

        console.log(editor?.getHTML())

    }
    return <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
            <div>
                <NewsletterHeader newsletter={newsletter} />
                <div className='pt-16 mx-auto pb-4 w-[700px]'>
                    <Editor
                        disableLocalStorage
                        onDebouncedUpdate={onEditorUpdate}
                    />
                </div>
            </div>

        </FormProvider>
    </form>
}