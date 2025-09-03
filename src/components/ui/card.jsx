import * as React from "react"

function Card({ className = "", ...props }) {
    return <div className={`rounded-xl border bg-white shadow ${className}`} {...props} />
}

function CardHeader({ className = "", ...props }) {
    return <div className={`p-4 border-b ${className}`} {...props} />
}

function CardTitle({ className = "", ...props }) {
    return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props} />
}

function CardContent({ className = "", ...props }) {
    return <div className={`p-4 ${className}`} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
