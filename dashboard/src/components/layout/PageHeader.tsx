import { PropsWithChildren } from "react"


export const PageHeader = ({ children }: PropsWithChildren) => {
    return (
        <div className="w-full flex justify-between items-center">
            {children}
        </div>
    )
}


export const PageHeading = ({ children }: PropsWithChildren) => {

    return <h1 className="text-2xl cal-sans">{children}</h1>
}