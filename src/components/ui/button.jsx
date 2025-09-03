import * as React from "react"

export function Button({ className = "", variant = "default", ...props }) {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
    const variants = {
        default: "bg-emerald-600 text-white hover:bg-emerald-700",
        outline: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    }
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props} />
    )
}
