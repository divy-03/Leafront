"use client"

import { useEffect, useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
// import { getCurrentUser } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery, useLoginMutation, userApi } from "@/services/userApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { FullLoader } from "@/components/loader";

const LoginSignupPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const { user, loading } = useSelector((state: any) => state.userReducer);

    if (loading) {
        return <FullLoader message="Logout if you are logged in" />
    }

    // 📌 Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "login") {
                const { access_token } = await login({ email, password }).unwrap();
                localStorage.setItem("access_token", access_token);
                dispatch(userApi.util.invalidateTags(["User"]));
                toast.success("✅ Login successful!");
                router.push("/employee");
            } else {
                toast.error("🚧 Signup not implemented yet.");
            }
        } catch (err: any) {
            toast.error("❌ " + (err?.data?.detail || err.message));
        }
    };

    return (
        <div className="
            min-h-dvh 
            bg-gradient-to-br from-green-50 via-white to-green-100
            dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
            flex flex-col items-center justify-center
        ">
            <div className="
                w-full max-w-md 
                bg-white dark:bg-zinc-900 
                rounded-2xl shadow-xl 
                p-8 flex flex-col items-center
                border border-green-100 dark:border-zinc-800
            ">
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">
                    {mode === "login" ? "🍃 Welcome Back" : "🍃 Create Your Account"}
                </h2>
                <p className="text-green-700 dark:text-green-400 mb-6 text-center">
                    {mode === "login"
                        ? "Log in to manage your leaves and requests."
                        : "Sign up to start using Leafman."}
                </p>

                <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
                    {mode === "signup" && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="border border-green-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800"
                            autoComplete="name"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-green-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-green-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-green-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-800"
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loginLoading}
                        className="
                            bg-green-700 dark:bg-green-800 
                            text-white px-6 py-2 rounded-full font-semibold shadow 
                            hover:bg-green-800 dark:hover:bg-green-900 
                            transition flex items-center justify-center gap-2 disabled:opacity-50
                        "
                    >
                        {loginLoading
                            ? "Loading..."
                            : mode === "login"
                                ? <><LogIn className="h-5 w-5" /> Login</>
                                : <><UserPlus className="h-5 w-5" /> Sign Up</>}
                    </button>
                </form>

                <div className="text-green-700 dark:text-green-400 text-sm mt-4">
                    {mode === "login" ? (
                        <>
                            New to Leafman?{" "}
                            <button
                                type="button"
                                className="text-green-900 dark:text-green-300 font-semibold underline hover:text-green-700 dark:hover:text-green-400 transition"
                                onClick={() => setMode("signup")}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-green-900 dark:text-green-300 font-semibold underline hover:text-green-700 dark:hover:text-green-400 transition"
                                onClick={() => setMode("login")}
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
            <footer className="mt-8 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Built for startups.
            </footer>
        </div>
    );
};

export default LoginSignupPage;
