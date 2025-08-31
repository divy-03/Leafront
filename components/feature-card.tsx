import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

type FeatureItem = {
  icon: ReactNode
  label: string
}

export function FeatureCard({
  title,
  items,
  tone = "employee",
}: {
  title: string
  items: FeatureItem[]
  tone?: "employee" | "admin"
}) {
  const border = tone === "employee" ? "border-green-200" : "border-teal-200"
  const badge = tone === "employee" ? "bg-green-100 text-green-800" : "bg-teal-100 text-teal-800"

  return (
    <Card className={`group h-full border ${border} transition-shadow hover:shadow-md`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs ${badge}`}>
            {tone === "employee" ? "Employee" : "Admin"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-md p-2 transition-transform transition-colors hover:translate-x-0.5 hover:bg-muted/50"
            >
              <span className="text-green-600">{item.icon}</span>
              <span className="text-sm text-foreground/80">{item.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
