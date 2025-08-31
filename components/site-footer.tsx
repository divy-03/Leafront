export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-foreground/70 md:flex-row">
        <p>© 2025 Leaf</p>
        <nav aria-label="Footer" className="flex items-center gap-4">
          <a className="transition-colors hover:text-foreground" href="/privacy">
            Privacy Policy
          </a>
          <a className="transition-colors hover:text-foreground" href="/terms">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  )
}
