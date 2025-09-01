import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leaveApi = createApi({
    reducerPath: "leaveApi",
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
    endpoints: (builder) => ({
        // 🔹 GET /leave-requests/
        getRequests: builder.query<any[] | null, void>({
            query: () => "/leave-requests/",
        }),
    }),
});

export const { useGetRequestsQuery } = leaveApi;