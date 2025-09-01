"use client";

import { FullLoader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login"); // redirect to login if no token
    }
  }, [token, router]);

  if (!token) {
    return <FullLoader message="Checking authentication..." />;
  }

  return <>{children}</>;
}
