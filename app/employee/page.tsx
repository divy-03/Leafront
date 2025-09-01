"use client";

import { getBalances, getRequests } from "@/utils/api";
import { useEffect, useState } from "react";
import { BadgeCheck, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Balances() {
    const [balances, setBalances] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
        const router = useRouter();
    

    useEffect(() => {
        getBalances()
            .then(data => {
                setBalances(data);
            })
            .catch(err => console.error("Error fetching balances:", err));

        getRequests()
            .then(data => {
                setRequests(data);
            })
            .catch(err => console.error("Error fetching requests:", err));
    }, []);

    if (balances === null) {
        router.push("/emp-login");
        return null;
    }

    if (requests === null) {
        return (
            <div className="min-h-dvh flex items-center justify-center">
                <p className="text-red-600 dark:text-red-400">Error loading requests. Please try again.</p>
            </div>
        );
    }
    

    return (
        <div className="
            min-h-[calc(100dvh-4rem)]
            bg-gradient-to-br from-green-50 via-white to-green-100
            dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
            flex flex-col items-center py-12
        ">
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-8">
                🍃 Your Leave Balances
            </h1>
            <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
                {balances.length === 0 ? (
                    <div className="text-green-700 dark:text-green-400 text-lg text-center w-full">
                        Loading balances...
                    </div>
                ) : (
                    balances.map((item, idx) => (
                        <div
                            key={idx}
                            className="
                                rounded-2xl border border-green-100 dark:border-zinc-800
                                bg-white dark:bg-zinc-900
                                shadow-lg p-6 flex flex-col gap-2
                                transition
                            "
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-lg font-semibold text-green-900 dark:text-green-300">
                                    {item.leave_type.name}
                                </span>
                                {item.leave_type.paid && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium">
                                        Paid
                                    </span>
                                )}
                                {!item.leave_type.paid && (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                                        Unpaid
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <CalendarDays className="h-4 w-4" />
                                    <span className="font-medium">Year:</span>
                                    <span>{item.year}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <span className="font-medium">Quota:</span>
                                    <span>{item.leave_type.annual_quota}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <span className="font-medium">Balance:</span>
                                    <span>{item.balance_days}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <span className="font-medium">Used:</span>
                                    <span>{item.used_days}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-700 dark:text-green-400">
                                    <span className="font-medium">Carry Forward:</span>
                                    <span>{item.leave_type.carry_forward ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 m-8 flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
                    Your Leave Requests
            </h1>

            <div className="w-full max-w-3xl mb-10">
                {/* <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
                    Your Leave Requests
                </h2> */}
                <div className="grid gap-6">
                    {requests.length === 0 ? (
                        <div className="text-green-700 dark:text-green-400 text-lg text-center w-full">
                            No requests found.
                        </div>
                    ) : (
                        requests.map((req, idx) => (
                            <div
                                key={idx}
                                className="
                                    rounded-2xl border border-green-100 dark:border-zinc-800
                                    bg-white dark:bg-zinc-900
                                    shadow-lg p-6 flex flex-col gap-2
                                    transition
                                "
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg font-semibold text-green-900 dark:text-green-300">
                                        {req.leave_type.name}
                                    </span>
                                    {req.leave_type.paid ? (
                                        <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium">
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                                            Unpaid
                                        </span>
                                    )}
                                    {req.is_half_day && (
                                        <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium">
                                            Half Day
                                        </span>
                                    )}
                                    <span className={`
                                      ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                                      ${req.status === "Pending"
                                            ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
                                            : req.status === "Approved"
                                                ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                                                : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"}
                                    `}>
                                        {req.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium">Dates:</span>
                                        <span>{req.start_date} &rarr; {req.end_date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium">Total Days:</span>
                                        <span>{req.total_days}</span>
                                    </div>
                                </div>
                                <div className="mt-2 text-green-900 dark:text-green-200 text-sm">
                                    <span className="font-medium">Reason:</span> {req.reason}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <footer className="mt-12 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Your leave at a glance.
            </footer>
        </div>
    );
}
