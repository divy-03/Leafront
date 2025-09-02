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
    tagTypes: ["LeaveType"], // ✅ add tag type for invalidation
    endpoints: (builder) => ({
        // 🔹 GET /leave-requests/
        getRequests: builder.query<any[] | null, void>({
            query: () => "/leave-requests/",
        }),

        // 🔹 GET /leave-requests/types
        getAllLeaveTypes: builder.query<any[] | null, void>({
            query: () => "/leave-requests/types",
            providesTags: ["LeaveType"], // ✅ so list gets updated
        }),

        // 🔹 POST /leave-types
        createLeaveType: builder.mutation<any, { name: string; description?: string }>({
            query: (newType) => ({
                url: "/leave-types",
                method: "POST",
                body: newType,
            }),
            invalidatesTags: ["LeaveType"], // ✅ refetch list after creation
        }),
    }),
});

export const { 
    useGetRequestsQuery, 
    useGetAllLeaveTypesQuery, 
    useCreateLeaveTypeMutation 
} = leaveApi;
