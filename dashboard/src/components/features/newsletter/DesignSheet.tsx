import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { PaintBucket } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"


type Props = {}

export const DesignSheet = (props: Props) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button className='text-gray-300 bg-gray-950 hover:bg-gray-800'>
                    <PaintBucket className='h-5 w-5 mr-2 text-gray-300' />
                    Design
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
                    <SheetTitle>Design your email</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 my-4">
                    <h3 className="font-semibold text-secondary-foreground text-sm">Body</h3>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Background</Label>
                        <Input type="color" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Align</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Align" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Width</Label>
                        <Input type="number" />
                    </div>
                    <Separator />
                    <h3 className="font-semibold text-secondary-foreground text-sm">Typography</h3>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Text</Label>
                        <Input type="color" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Size</Label>
                        <Input type="number" />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Label>Line Height</Label>
                        <Input type="number" />
                    </div>
                </div>
                <SheetFooter>

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}