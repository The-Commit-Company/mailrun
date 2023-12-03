import {
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "../ui/skeleton"

interface TableLoaderProps {
    rows?: number,
    columns?: number
}

export const TableLoader = ({ rows = 10, columns = 5 }: TableLoaderProps) => {
    return (
        <TableBody>
            {
                [...Array(rows)].map((e, index) => <TableRow key={index}>
                    {[...Array(columns)].map((e, i) => <TableCell key={i}>
                        <Skeleton className="h-4 w-[250px]" />
                    </TableCell>)}
                </TableRow>)
            }
        </TableBody>
    )
}