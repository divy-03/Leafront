"use client"

import { FullLoader } from "@/components/loader";
import { 
    useGetAllLeaveTypesQuery, 
    // useCreateLeaveTypeMutation 
} from "@/services/leaveApi";
import { BadgeCheck, Leaf } from "lucide-react";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LeaveType } from "@/types";

export default function LeaveTypes() {
    const { data: balances, isLoading } = useGetAllLeaveTypesQuery();

    if (isLoading) return <FullLoader message="Loading leave types..." />

    return (
        <div
            className="
        min-h-[calc(100dvh-4rem)] flex flex-col items-center py-12
        bg-gradient-to-br from-green-50 via-white to-green-100
        dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900
      "
        >
            <div className="flex items-center justify-between w-full max-w-3xl mb-8">
                <h1 className="text-3xl font-bold text-green-900 dark:text-green-300 flex items-center gap-2">
                    <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                    Leave Types
                </h1>
                {/* 👇 AddLeaveType button+dialog */}
                <AddLeaveType />
            </div>

            <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
                {!balances || balances.length === 0 ? (
                    <p className="text-green-700 dark:text-green-400 text-lg text-center w-full">
                        No leave type found
                    </p>
                ) : (
                    balances.map((item: LeaveType, idx: number) => (
                        <div
                            key={idx}
                            className="
                rounded-2xl border border-green-100 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                shadow-lg p-6 flex flex-col gap-2
              "
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                <span className="text-lg font-semibold text-green-900 dark:text-green-300">
                                    {item.name}
                                </span>
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                                    #{item.leave_type_id}
                                </span>
                                {item.paid ? (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 text-xs font-medium">
                                        Unpaid
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-green-700 dark:text-green-400">
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">Annual Quota:</span>
                                    <span>{item.annual_quota}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="font-medium">Carry Forward:</span>
                                    <span>{item.carry_forward ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <footer className="mt-12 text-green-600 dark:text-green-400 text-xs text-center">
                &copy; {new Date().getFullYear()} Leafman &mdash; Leave Types.
            </footer>
        </div>
    )
}

export function AddLeaveType() {
    // const [addLeaveType, { isLoading }] = useCreateLeaveTypeMutation()
    const [formData, setFormData] = useState({ name: "", username: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // await addLeaveType(formData).unwrap() // 👈 call mutation
            console.log("Form submitted:", formData);
            setFormData({ name: "", username: "" }) // reset form
        } catch (err) {
            console.error("Failed to add leave type:", err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">+ Add Leave Type</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Leave Type</DialogTitle>
                        <DialogDescription>
                            Enter details of the new leave type below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Leave name"
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Unique username"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={false}> {/* 👈 change to isLoading */}
                            {false ? "Saving..." : "Save changes"} {/* 👈 change to isLoading */}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
