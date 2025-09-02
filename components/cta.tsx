import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section aria-label="Call to action" className="rounded-2xl border bg-muted/40 p-6 md:p-10">
      <div className="mx-auto max-w-4xl text-center">
        <blockquote className="text-balance text-xl text-foreground md:text-2xl">
          “Empowering workplaces with balance and transparency.”
        </blockquote>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/login">Login as Employee</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Link href="/admin">Login as Admin</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
