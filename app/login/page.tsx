"use client"

import { useState } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginMutation, userApi } from "@/services/userApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/types";

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, loading } = useAppSelector((state) => state.userReducer as {
        user: User | null;
        loading: boolean;
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading: loginLoading }] = useLoginMutation();

    // 📌 Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { access_token } = await login({ email, password }).unwrap();
            localStorage.setItem("access_token", access_token);
            dispatch(userApi.util.invalidateTags(["User"]));
            toast.success("✅ Login successful!");
            // the below code lags because I'm not sending user directly from login response but fetching separately
            if (user && !loading) {
                if (user.role === "Employee") {
                    toast.success("🍃 Welcome back, " + user.first_name + "!");
                    router.push("/employee");
                } else if (user.role === "Admin") {
                    toast.success("🌳 Welcome back, Admin " + user.first_name + "!");
                    router.push("/admin");
                }
            }
        } catch {
            toast.error("❌ " + "Invalid email or password.");
        }
    };

    return (
        <div className="
            min-h-[calc(100dvh-4rem)] 
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
                    🍃 Welcome Back
                </h2>
                <p className="text-green-700 dark:text-green-400 mb-6 text-center">
                    Log in to manage your leaves and requests.
                </p>

                <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
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
                        autoComplete="current-password"
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
                            : <><LogIn className="h-5 w-5" /> Login</>}
                    </button>
                </form>
            </div>
            <footer className="mt-8 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Built for startups.
            </footer>
        </div>
    );
};

export default LoginPage;
