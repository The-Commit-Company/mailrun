import { ErrorBanner } from "@/components/layout/ErrorBanner"
import { PageHeader, PageHeading } from "@/components/layout/PageHeader"
import { TableLoader } from "@/components/layout/TableLoader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { convertFrappeDateStringToTimeAgo } from "@/lib/dates"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { Plus } from "lucide-react"

export const Categories = () => {
    return (
        <div className="flex flex-col gap-2">
            <PageHeader>
                <PageHeading>Categories</PageHeading>
                <div className="flex items-center space-x-2">
                    <Button size={'sm'}>
                        <Plus size={16} className="mr-2 h-4 w-4" />
                        Create category
                    </Button>
                </div>
            </PageHeader>
            <CategoriesList />
        </div>
    )
}

const CategoriesList = () => {

    const { data, isLoading, error } = useFrappeGetDocList('Blog Category', {
        fields: ['name', 'title', 'modified', 'published', 'creation', 'owner'],
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
                <TableCell className="hover:underline underline-offset-2">{doc.title}</TableCell>
                <TableCell>{doc.published ? <Badge variant='success'>Published</Badge> : <Badge variant='secondary'>Not Published</Badge>}</TableCell>
                <TableCell className="text-muted-foreground">{convertFrappeDateStringToTimeAgo(doc.creation)}</TableCell>
            </TableRow>)}
        </TableBody>}

    </Table>
}