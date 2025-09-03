export type User = {
  department_id: number;
  email: string;
  first_name: string;
  join_date: string;
  last_name: string;
  role: "Admin" | "Employee";
  user_id: number;
};

export interface LeaveTypeReq {
  name: string;
  paid: boolean;
  annual_quota: string;   // can be number
  carry_forward: boolean;
}

export interface LeaveType {
  name: string;
  paid: boolean;
  annual_quota: string;   // can be number
  carry_forward: boolean;
  leave_type_id: number;
}

export interface LeaveBalance {
  leave_type: LeaveType;
  year: number;
  balance_days: string;   // same here → can be number if API gives numeric values
  used_days: string;
}

export interface LeaveRequest {
  request_id: number;
  user_id: User;
  leave_type: LeaveType;
  start_date: string;  // ISO date string
  end_date: string;    // ISO date string
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  total_days: string;
  is_half_day: boolean;
}