import * as React from "react"

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={`flex w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"
