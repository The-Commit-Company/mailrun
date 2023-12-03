import { ErrorBanner } from "@/components/layout/ErrorBanner"
import { PageHeader, PageHeading } from "@/components/layout/PageHeader"
import { TableLoader } from "@/components/layout/TableLoader"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { convertFrappeDateStringToTimeAgo } from "@/lib/dates"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { Import, Plus } from "lucide-react"

export const Audience = () => {
    return (
        <div className="flex flex-col gap-2">
            <PageHeader>
                <PageHeading>Audience</PageHeading>
                <div className="flex items-center space-x-2">
                    <Button variant='secondary' size='sm'>
                        <Import className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                    <Button size='sm'>
                        <Plus size={16} className="mr-2 h-4 w-4" />
                        Create audience
                    </Button>
                </div>
            </PageHeader>
            <AudienceList />
        </div>
    )
}

const AudienceList = () => {

    const { data, isLoading, error } = useFrappeGetDocList('Email Group', {
        fields: ['name', 'title', 'modified', 'total_subscribers', 'creation', 'owner'],
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
                <TableHead>Subscribers</TableHead>
                <TableHead>Created</TableHead>
            </TableRow>
        </TableHeader>
        {isLoading && <TableLoader columns={3} />}
        {data && <TableBody>
            {data.map(doc => <TableRow key={doc.name}>
                <TableCell className="hover:underline underline-offset-2">{doc.title}</TableCell>
                <TableCell>{(doc.total_subscribers ?? 0).toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground">{convertFrappeDateStringToTimeAgo(doc.creation)}</TableCell>
            </TableRow>)}
        </TableBody>}

    </Table>
}