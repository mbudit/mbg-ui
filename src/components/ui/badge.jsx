import * as React from "react"

export function Badge({ children, variant = "default", className = "" }) {
    const variants = {
        default: "bg-emerald-100 text-emerald-800",
        secondary: "bg-gray-100 text-gray-800",
    }
    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    )
}
