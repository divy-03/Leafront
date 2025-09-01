"use client";

import { FullLoader } from "@/components/loader";
import { useGetRequestsQuery } from "@/services/leaveApi";
import { useGetBalancesQuery } from "@/services/userApi";
import { LeaveBalance } from "@/types";
import { BadgeCheck, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Balances() {
  const router = useRouter();

  const { data: balances, isLoading: balancesLoading, isError: balancesError } = useGetBalancesQuery();
  const { data: requests, isLoading: requestsLoading, isError: requestsError } = useGetRequestsQuery();

  // 🔹 Handle redirect if balances API says unauthenticated
  if (balancesError) {
    router.push("/emp-login");
    return null;
  }

  // use skeleton instead of these loading 
  if (balancesLoading || requestsLoading) {
    return <FullLoader message="Loading your info" />
  }

  if (requestsError) {
    return (
      <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center">
        <p className="text-red-600 dark:text-red-400">Error loading requests. Please try again.</p>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-[calc(100dvh-4rem)]
        bg-gradient-to-br from-green-50 via-white to-green-100
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
        flex flex-col items-center py-12
      "
    >
      {/* Leave Balances */}
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-8">
        🍃 Your Leave Balances
      </h1>
      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        {!balances || balances.length === 0 ? (
          <p className="text-green-700 dark:text-green-400 text-lg text-center w-full">
            No leave balances found.
          </p>
        ) : (
          balances.map((item: LeaveBalance, idx: number) => (
            <div
              key={idx}
              className="
                rounded-2xl border border-green-100 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                shadow-lg p-6 flex flex-col gap-2
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-lg font-semibold text-green-900 dark:text-green-300">
                  {item.leave_type.name}
                </span>
                {item.leave_type.paid ? (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium">
                    Paid
                  </span>
                ) : (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                    Unpaid
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span className="font-medium">Year:</span>
                  <span>{item.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Quota:</span>
                  <span>{item.leave_type.annual_quota}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Balance:</span>
                  <span>{item.balance_days}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Used:</span>
                  <span>{item.used_days}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">Carry Forward:</span>
                  <span>{item.leave_type.carry_forward ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Leave Requests */}
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 m-8 flex items-center gap-2">
        <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
        Your Leave Requests
      </h1>

      <div className="w-full max-w-3xl mb-10">
        <div className="grid gap-6">
          {!requests || requests.length === 0 ? (
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
                  <span
                    className={`
                      ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                      ${req.status === "Pending"
                          ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
                          : req.status === "Approved"
                          ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                          : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"}
                    `}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Dates:</span>
                    <span>{req.start_date} → {req.end_date}</span>
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
        &copy; {new Date().getFullYear()} Leafman — Your leave at a glance.
      </footer>
    </div>
  );
}
