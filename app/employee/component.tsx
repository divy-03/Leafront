import { useState } from "react";
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
  useGetAllLeaveTypesQuery,
  useCreateLeaveRequestMutation,
} from "@/services/leaveApi";
import { LeaveType } from "@/types";

export function AddRequest() {
  const { data: leaveTypes } = useGetAllLeaveTypesQuery();
  const [createLeaveRequest, { isLoading: isSubmitting }] =
    useCreateLeaveRequestMutation();

  const [formData, setFormData] = useState({
    leave_type_id: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createLeaveRequest(formData).unwrap();
      // Reset form after success
      setFormData({
        leave_type_id: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (error) {
      console.error("Failed to submit leave request:", error);
    }
  };

  // if (isLoading) return <FullLoader message="Loading leave types..." />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Request Leave</DialogTitle>
            <DialogDescription>
              Fill out the form below to request leave.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="leave_type_id">Leave Type</Label>
            <select
              name="leave_type_id"
              id="leave_type_id"
              className="p-2 border border-gray-300 rounded-md"
              value={formData.leave_type_id}
              onChange={handleChange}
              required
            >
              <option value="">Select leave type</option>
              {leaveTypes?.map((type: LeaveType) => (
                <option key={type.leave_type_id} value={type.leave_type_id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="end_date">End Date</Label>
            <Input
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
