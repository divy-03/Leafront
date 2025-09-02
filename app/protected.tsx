"use client";

import { FullLoader } from "@/components/loader";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.userReducer as {
    user: User | null;
    loading: boolean;
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <FullLoader message="🌿 Growing your dashboard..." />;
  }

  if (!user) {
    return null; // Already redirected
  }

  return <>{children}</>;
}
