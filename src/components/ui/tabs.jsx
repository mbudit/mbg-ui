import * as React from "react"

export function Tabs({ value, onValueChange, children, className }) {
    return <div className={className}>{children}</div>
}

export function TabsList({ children, className }) {
    return <div className={`flex gap-2 border-b pb-2 ${className}`}>{children}</div>
}

export function TabsTrigger({ value, children, className, onClick }) {
    return (
        <button
            className={`px-3 py-1 rounded-md text-sm font-medium hover:bg-emerald-50 ${className}`}
            onClick={() => onClick?.(value)}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, children, className }) {
    return <div className={className}>{children}</div>
}
