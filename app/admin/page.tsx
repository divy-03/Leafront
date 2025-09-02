"use client"

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ClipboardList, Building2, Leaf, Users, BadgeCheck, UserCheck } from "lucide-react";
import { FullLoader } from "@/components/loader";

const adminFeatures = [
    {
        title: "Pending Requests",
        description: "View and manage all pending leave requests.",
        href: "/admin/pending",
        icon: <BadgeCheck className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
        title: "All Requests",
        description: "See every leave request in the system.",
        href: "/admin/all-requests",
        icon: <ClipboardList className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
        title: "Leave Types",
        description: "Manage all configured leave types.",
        href: "/admin/leavetypes",
        icon: <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
        title: "Departments",
        description: "View and edit departments.",
        href: "/admin/departments",
        icon: <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
        title: "Users",
        description: "Add or manage users.",
        href: "/admin/users",
        icon: <Users className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
    {
        title: "Your Balance",
        description: "Check your personal leave balance.",
        href: "/admin/balance",
        icon: <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />,
    },
];

export default function AdminPage() {
    

    return (
        <div className="
            min-h-[calc(100dvh-4rem)] flex flex-col items-center py-12
            bg-gradient-to-br from-green-50 via-white to-green-100
            dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
        ">
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-8">
                🍃 Admin Dashboard
            </h1>
            <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
                {adminFeatures.map((feature, idx) => (
                    <a
                        key={idx}
                        href={feature.href}
                        className="
                            rounded-2xl border border-green-100 dark:border-zinc-800
                            bg-white dark:bg-zinc-900
                            shadow-lg p-6 flex items-center gap-4 transition hover:shadow-xl hover:border-green-300 dark:hover:border-green-500
                        "
                    >
                        <div>{feature.icon}</div>
                        <div>
                            <div className="text-lg font-semibold text-green-900 dark:text-green-300">{feature.title}</div>
                            <div className="text-green-700 dark:text-green-400 text-sm">{feature.description}</div>
                        </div>
                    </a>
                ))}
            </div>
            <footer className="mt-12 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Admin tools.
            </footer>
        </div>
    );
}