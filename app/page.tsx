import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { FeatureCard } from "@/components/feature-card"
import { CTA } from "@/components/cta"
import { SiteFooter } from "@/components/site-footer"
import {
  LogIn,
  ClipboardList,
  History,
  Plane,
  Info,
  UserPlus,
  Eye,
  CheckSquare,
  ThumbsUp,
  Leaf,
  Building2,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-8 md:space-y-14 md:py-12">
        <Hero />

        <section aria-label="Features" className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="For Employees"
            tone="employee"
            items={[
              { icon: <LogIn className="h-5 w-5" />, label: "Login / Logout" },
              { icon: <ClipboardList className="h-5 w-5" />, label: "View Balances" },
              { icon: <History className="h-5 w-5" />, label: "View History" },
              { icon: <Plane className="h-5 w-5" />, label: "Apply for Leave" },
              { icon: <Info className="h-5 w-5" />, label: "whoami" },
            ]}
          />

          <FeatureCard
            title="For Admins"
            tone="admin"
            items={[
              { icon: <CheckSquare className="h-5 w-5" />, label: "All Employee Features" },
              { icon: <UserPlus className="h-5 w-5" />, label: "User Management" },
              { icon: <Eye className="h-5 w-5" />, label: "View All Requests" },
              { icon: <ThumbsUp className="h-5 w-5" />, label: "Approve / Reject" },
              { icon: <Leaf className="h-5 w-5" />, label: "Manage Leave Types" },
              { icon: <Building2 className="h-5 w-5" />, label: "Manage Departments" },
            ]}
          />
        </section>

        <CTA />
      </main>
      <SiteFooter />
    </div>
  )
}
