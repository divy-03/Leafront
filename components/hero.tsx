import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="
        relative overflow-hidden rounded-2xl border
        bg-gradient-to-b from-green-50 to-white
        dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-800
        p-8 md:p-12
      "
    >
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 opacity-15
          [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]
          dark:opacity-20
        "
        style={{
          backgroundImage: "url('/subtle-leaf-pattern-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="
          text-balance text-3xl font-semibold tracking-tight
          text-foreground md:text-5xl
          dark:text-white
        ">
          Simplify Leave Management with Leaf
        </h1>
        <p className="
          text-pretty mx-auto mt-4 max-w-2xl
          text-foreground/70 md:text-lg
          dark:text-zinc-300
        ">
          A seamless platform for employees and admins to manage leaves effortlessly.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900">
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
