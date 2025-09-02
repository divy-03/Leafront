"use client";

import { FullLoader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useSelector((state: any) => state.userReducer);

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
