// services/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LeaveBalance, User } from "@/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("access_token");
                if (token) {
                    headers.set("Authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    tagTypes: ["User"], // 👈 declare valid tags here
    endpoints: (builder) => ({
        // 🔹 GET /users/me
        getCurrentUser: builder.query<User | null, void>({
            query: () => "/users/me",
            providesTags: ["User"], // 👈 tells RTKQ this query provides "User"
        }),

        getBalances: builder.query<LeaveBalance[] | null, void>({
            query: () => "/users/me/balances",
        }),

        // 🔹 POST /auth/token (Login)
        login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: "/auth/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username: email,
                    password: password,
                }),
            }),
            invalidatesTags: ["User"], // 👈 clears "User" cache after login
        }),
    }),
});

export const { useGetCurrentUserQuery, useLoginMutation, useGetBalancesQuery } = userApi;
