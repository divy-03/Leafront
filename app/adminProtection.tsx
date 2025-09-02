"use client";

import { FullLoader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useSelector((state: any) => state.userReducer);
    const router = useRouter();

    if (loading) {
        return <FullLoader message="🌿 Growing your admin dashboard..." />;
    }

    if (!user) {
        router.push("/login");
        return null;
    }

    if (user.role !== "Admin") {
        return (
            <div className="
                min-h-[calc(100dvh-4rem)] flex items-center justify-center
                bg-gradient-to-br from-green-50 via-white to-green-100
                dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
            ">
                <p className="text-red-600 dark:text-red-400 text-lg">Access Denied. Admins only.</p>
            </div>
        );
    }


    return <>{children}</>;
}
