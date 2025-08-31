"use client"

import ThemSwitch from "./theme-switch";


import Link from "next/link"

export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span aria-hidden className="text-lg">
            🍃
          </span>
          <span className="font-semibold tracking-tight">Leaf</span>
          <span className="sr-only">Leaf - Leave Management</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/">
            Home
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/employee">
            Employee Portal
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/admin">
            Admin Console
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="text-foreground/80 transition-colors hover:text-foreground" href="/contact">
            Contact
          </Link>
          <ThemSwitch />
        </nav>
      </div>
    </header>
  )
}
