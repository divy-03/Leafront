// if Rejected or Approved dont show update button also modify the form

"use client";

import { FullLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetAdminRequestsQuery,
  useUpdateLeaveStatusMutation,
} from "@/services/leaveApi";
import { AdminLeaveRequest } from "@/types";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function AdminLeaveRequestsPage() {
  const { data: requests, isLoading } = useGetAdminRequestsQuery();
  const [updateLeaveStatus] = useUpdateLeaveStatusMutation();

  // ✅ Store status + notes for each request_id
  const [formData, setFormData] = useState<
    Record<
      number,
      {
        status: "Pending" | "Approved" | "Rejected";
        approvalNote: string;
      }
    >
  >({});

  const handleChange = (
    request_id: number,
    field: "status" | "approvalNote",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [request_id]: {
        ...prev[request_id],
        [field]:
          field === "status"
            ? (value as "Pending" | "Approved" | "Rejected")
            : value,
      },
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    request_id: number
  ) => {
    e.preventDefault();

    const data = formData[request_id];
    if (!data) return;

    try {
      await updateLeaveStatus({
        request_id,
        status: data.status,
        approval_note: data.approvalNote,
      }).unwrap();
    } catch (err) {
      console.log("Error updating leave status:", err);
      toast.error("Leave request has already been processed.");
    }
  };

  if (isLoading) return <FullLoader message="Loading leave requests..." />;

  return (
    <div
      className="
        min-h-[calc(100dvh-4rem)]
        bg-gradient-to-br from-green-50 via-white to-green-100
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
        flex flex-col items-center py-12
      "
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-8">
        🍃 Admin Leave Requests
      </h1>

      {/* Requests List */}
      <div className="w-full max-w-3xl mb-10">
        <div className="grid gap-6">
          {!requests || requests.length === 0 ? (
            <div className="text-green-700 dark:text-green-400 text-lg text-center w-full">
              No requests found.
            </div>
          ) : (
            requests.map((req: AdminLeaveRequest, idx: number) => {
              const requestData = formData[req.request_id] || {
                status: req.status as "Pending" | "Approved" | "Rejected",
                approvalNote: "",
              };

              return (
                <div
                  key={idx}
                  className="
                    rounded-2xl border border-green-100 dark:border-zinc-800 
                    bg-white dark:bg-zinc-900 shadow-lg p-6 
                    flex flex-row gap-4 items-center justify-between 
                    hover:scale-[1.01] transition-transform duration-200
                  "
                >
                  {/* Request Details */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-semibold text-green-900 dark:text-green-300">
                        {req.user.first_name + " " + req.user.last_name}
                      </span>
                      {req.leave_type.paid ? (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium">
                          Paid
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                          Unpaid
                        </span>
                      )}
                      <span
                        className={`
                          ml-2 px-2 py-0.5 rounded-full text-xs font-medium
                          ${
                            req.status === "Pending"
                              ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
                              : req.status === "Approved"
                              ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200"
                              : "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200"
                          }
                        `}
                      >
                        {req.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                      <span className="font-medium">
                        Leave Type: {req.leave_type.name}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Dates:</span>
                        <span>
                          {req.start_date} → {req.end_date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Total Days:</span>
                        <span>{req.total_days}</span>
                      </div>
                    </div>

                    <div className="mt-2 text-green-900 dark:text-green-200 text-sm">
                      <span className="font-medium">Reason:</span> {req.reason}
                    </div>
                  </div>

                  {/* Update Dialog */}
                  <div className="flex flex-col items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Update</Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={(e) => handleSubmit(e, req.request_id)}>
                          <DialogHeader>
                            <DialogTitle>Update Leave</DialogTitle>
                            <DialogDescription>
                              Update the details for this leave request.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4">
                            {/* Status Dropdown */}
                            <div className="grid gap-3">
                              <Label htmlFor={`status-${req.request_id}`}>
                                Status
                              </Label>
                              <select
                                id={`status-${req.request_id}`}
                                name="status"
                                value={requestData.status ?? "Pending"}
                                onChange={(e) =>
                                  handleChange(
                                    req.request_id,
                                    "status",
                                    e.target.value
                                  )
                                }
                                className="border rounded-md p-2 bg-white dark:bg-zinc-800 text-green-900 dark:text-green-200"
                              >
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </div>

                            {/* Approval Note */}
                            <div className="grid gap-3">
                              <Label
                                htmlFor={`approval_note-${req.request_id}`}
                              >
                                Approval Note
                              </Label>
                              <Input
                                id={`approval_note-${req.request_id}`}
                                name="approval_note"
                                placeholder="Write a note..."
                                value={requestData.approvalNote ?? ""}
                                onChange={(e) =>
                                  handleChange(
                                    req.request_id,
                                    "approvalNote",
                                    e.target.value
                                  )
                                }
                                className="bg-white dark:bg-zinc-800 text-green-900 dark:text-green-200"
                              />
                            </div>
                          </div>

                          <DialogFooter className="mt-4">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
