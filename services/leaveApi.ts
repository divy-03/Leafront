import {
  AdminLeaveRequest,
  createLeaveRequestPayload,
  FailedResponse,
  LeaveRequest,
  LeaveType,
  LeaveTypeReq,
  UpdateLeavePayload,
  UpdateLeaveResponse,
} from "@/types";
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
    getRequests: builder.query<LeaveRequest[] | null, void>({
      query: () => "/leave-requests/",
    }),

    // 🔹 GET /leave-requests/types
    getAllLeaveTypes: builder.query<LeaveType[] | null, void>({
      query: () => "/leave-requests/types",
      providesTags: ["LeaveType"], // ✅ so list gets updated
    }),

    createLeaveRequest: builder.mutation<
      LeaveRequest | null,
      createLeaveRequestPayload
    >({
      query: (newRequest) => ({
        url: "/leave-requests",
        method: "POST",
        body: newRequest,
      }),
      invalidatesTags: ["LeaveType"],
    }),

    // 🔹 POST /leave-types
    createLeaveType: builder.mutation<LeaveType | null, LeaveTypeReq>({
      query: (newType) => ({
        url: "/admin/leave-types",
        method: "POST",
        body: newType,
      }),
      invalidatesTags: ["LeaveType"], // ✅ refresh list after creation
    }),
    // getAdminRequests: builder.query<any | null, { status: string }>({
    //     query: ({ status }) =>
    //         status && status.trim() !== ""
    //             ? `/admin/leave-requests?status=${status}`
    //             : `/admin/leave-requests`,
    // }),
    getAdminRequests: builder.query<AdminLeaveRequest[] | null, void>({
      query: () => `/admin/leave-requests`,
    }),

    updateLeaveStatus: builder.mutation<
      UpdateLeaveResponse | FailedResponse,
      UpdateLeavePayload
    >({
      query: ({ request_id, status, approval_note }) => ({
        url: `/admin/leave-requests/${request_id}`,
        method: "PATCH",
        body: { status, approval_note },
      }),
      // Invalidate the 'LeaveRequest' tag to refetch the leave requests
      invalidatesTags: ["LeaveType"], // You can adjust this based on your needs
    }),

    // Additional endpoints can be defined here
  }),
});

export const {
  useGetRequestsQuery,
  useGetAllLeaveTypesQuery,
  useCreateLeaveTypeMutation,
  useGetAdminRequestsQuery,
  useUpdateLeaveStatusMutation,
  useCreateLeaveRequestMutation,
} = leaveApi;
