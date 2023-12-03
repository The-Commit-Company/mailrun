import { ErrorBanner } from "@/components/layout/ErrorBanner"
import { PageHeader, PageHeading } from "@/components/layout/PageHeader"
import { TableLoader } from "@/components/layout/TableLoader"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { convertFrappeDateStringToTimeAgo } from "@/lib/dates"
import { useFrappeGetDocList } from "frappe-react-sdk"
import { Plus } from "lucide-react"

export const Authors = () => {
    return (
        <div className="flex flex-col gap-2">
            <PageHeader>
                <PageHeading>Authors</PageHeading>
                <div className="flex items-center space-x-2">
                    <Button size='sm'>
                        <Plus size={16} className="mr-2 h-4 w-4" />
                        Create author
                    </Button>
                </div>
            </PageHeader>
            <AuthorsList />
        </div>
    )
}
const getInitials = (name?: string) => {
    if (!name) return ''
    const [firstName, lastName] = name.split(' ')
    return firstName[0] + (lastName?.[0] ?? '')
}
const AuthorsList = () => {

    const { data, isLoading, error } = useFrappeGetDocList('Blogger', {
        fields: ['name', 'full_name', 'modified', 'disabled', 'creation', 'owner', 'avatar', 'short_name'],
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
                <TableHead>Short name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
            </TableRow>
        </TableHeader>
        {isLoading && <TableLoader columns={3} />}
        {data && <TableBody>
            {data.map(doc => <TableRow key={doc.name}>
                <TableCell className="hover:underline underline-offset-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={doc.avatar} />
                            <AvatarFallback>{getInitials(doc.full_name)}</AvatarFallback>
                        </Avatar>
                        {doc.full_name}
                    </div>

                </TableCell>
                <TableCell className="text-muted-foreground">{doc.short_name}</TableCell>
                <TableCell>{doc.disabled ? <Badge variant='destructive'>Disabled</Badge> : <Badge variant='success'>Enabled</Badge>}</TableCell>
                <TableCell className="text-muted-foreground">{convertFrappeDateStringToTimeAgo(doc.creation)}</TableCell>
            </TableRow>)}
        </TableBody>}

    </Table>
}