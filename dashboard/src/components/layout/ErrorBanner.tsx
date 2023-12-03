import { FrappeError } from 'frappe-react-sdk'
import { PropsWithChildren, useMemo } from 'react'
import React from 'react'
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

interface ErrorBannerProps {
    error?: FrappeError | null,
    children?: React.ReactNode
}

interface ParsedErrorMessage {
    message: string,
    title?: string,
    indicator?: string,
}
export const ErrorBanner = ({ error, children }: ErrorBannerProps) => {


    //exc_type: "ValidationError" or "PermissionError" etc
    // exc: With entire traceback - useful for reporting maybe
    // httpStatus and httpStatusText - not needed
    // _server_messages: Array of messages - useful for showing to user
    // console.log(JSON.parse(error?._server_messages!))

    const messages = useMemo(() => {
        if (!error) return []
        let eMessages: ParsedErrorMessage[] = error?._server_messages ? JSON.parse(error?._server_messages) : []
        eMessages = eMessages.map((m: any) => {
            try {
                return JSON.parse(m)
            } catch (e) {
                return m
            }
        })

        if (eMessages.length === 0) {
            // Get the message from the exception by removing the exc_type
            const indexOfFirstColon = error?.exception?.indexOf(':')
            if (indexOfFirstColon) {
                const exception = error?.exception?.slice(indexOfFirstColon + 1)
                if (exception) {
                    eMessages = [{
                        message: exception,
                        title: "Error"
                    }]
                }
            }

            if (eMessages.length === 0) {
                eMessages = [{
                    message: error?.message,
                    title: "Error",
                    indicator: "red"
                }]
            }
        }
        return eMessages
    }, [error])

    if (messages.length === 0 || !error) return null
    return (<ErrorCallout>
        {/* Can do this since the error will be coming from the server */}
        {messages.map((m, i) => <div key={i} dangerouslySetInnerHTML={{
            __html: m.message
        }} />)}
        {children}
    </ErrorCallout>)
}


export const ErrorCallout = ({ children }: PropsWithChildren) => {
    return (<Alert variant='destructive'>
        <AlertTriangle className="mr-2 h-4 w-4" />
        <AlertTitle>
            {children}
        </AlertTitle>
    </Alert>)
}