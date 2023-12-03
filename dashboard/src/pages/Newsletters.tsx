import { ErrorBanner } from "@/components/layout/ErrorBanner"
import { PageHeader, PageHeading } from "@/components/layout/PageHeader"
import { TableLoader } from "@/components/layout/TableLoader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { convertFrappeDateStringToTimeAgo } from "@/lib/dates"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export const Newsletters = () => {
    return (
        <div>
            <PageHeader>
                <PageHeading>Newsletters</PageHeading>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus size={16} className="mr-2 h-4 w-4" />
                        Create email
                    </Button>
                </div>
            </PageHeader>
            <NewslettersList />
        </div>
    )
}

const NewslettersList = () => {

    const { data, isLoading, error } = useFrappeGetDocList('Newsletter', {
        fields: ['name', 'subject', 'modified', 'email_sent', 'creation', 'owner'],
        orderBy: {
            field: 'modified',
            order: 'desc'
        }
    })

    //TODO: Pagination and search/filters

    if (error) {
        return <ErrorBanner error={error} />
    }

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
            </TableRow>
        </TableHeader>
        {isLoading && <TableLoader columns={3} />}
        {data && <TableBody>
            {data.map(doc => <TableRow key={doc.name}>
                <TableCell className="hover:underline underline-offset-2"><Link to={doc.name}>{doc.subject}</Link></TableCell>
                <TableCell>{!doc.email_sent ? <Badge variant='success'>Sent</Badge> : <Badge variant='secondary'>Draft</Badge>}</TableCell>
                <TableCell className="text-muted-foreground">{convertFrappeDateStringToTimeAgo(doc.creation)}</TableCell>
            </TableRow>)}
        </TableBody>}

    </Table>
}