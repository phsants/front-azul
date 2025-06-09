export function Card({ children, className = "" }) {
  return <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "p-4" }) {
  return <div className={className}>{children}</div>;
}