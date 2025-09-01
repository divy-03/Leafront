"use client"

import { useSelector } from "react-redux";

export default function Profile() {
    // const { data, isLoading } = useGetCurrentUserQuery();
    const { user, loading } = useSelector((state: any) => state.userReducer);

    // console.log("User from Redux:", user);

    if (loading) {
        return (
            <div className="
                min-h-[calc(100dvh-4rem)] flex items-center justify-center
                bg-gradient-to-br from-green-50 via-white to-green-100
                dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
            ">
                <p className="text-green-700 dark:text-green-400 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="
                min-h-[calc(100dvh-4rem)] flex items-center justify-center
                bg-gradient-to-br from-green-50 via-white to-green-100
                dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
            ">
                <p className="text-red-600 dark:text-red-400 text-lg">Could not load profile.</p>
            </div>
        );
    }

    // const user: User = data;

    return (
        <div className="
            min-h-[calc(100dvh-4rem)] flex flex-col items-center py-12
            bg-gradient-to-br from-green-50 via-white to-green-100
            dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
        ">
            <div className="
                w-full max-w-md bg-white dark:bg-zinc-900
                rounded-2xl shadow-xl p-8 flex flex-col items-center
                border border-green-100 dark:border-zinc-800
            ">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-green-900 dark:text-green-300">
                        {user.first_name[0]}
                    </span>
                </div>
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">
                    {user.first_name} {user.last_name}
                </h2>
                <p className="text-green-700 dark:text-green-400 mb-4 text-center">
                    {user.role}
                </p>
                <div className="w-full flex flex-col gap-2 text-green-900 dark:text-green-200 text-sm">
                    <div>
                        <span className="font-medium">Email:</span> {user.email}
                    </div>
                    <div>
                        <span className="font-medium">Department ID:</span> {user.department_id}
                    </div>
                    <div>
                        <span className="font-medium">Joined:</span> {user.join_date}
                    </div>
                    <div>
                        <span className="font-medium">User ID:</span> {user.user_id}
                    </div>
                </div>
            </div>
            <footer className="mt-8 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Your profile.
            </footer>
        </div>
    );
}