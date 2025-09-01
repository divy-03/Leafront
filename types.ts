export type User = {
    department_id: number;
    email: string;
    first_name: string;
    join_date: string;
    last_name: string;
    role: string;
    user_id: number;
};

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
