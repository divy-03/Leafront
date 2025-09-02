"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrentUserQuery } from "@/services/userApi";
import { userExist, userNotExist } from "@/reducers/userReducer";

export function UserInitializer() {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useGetCurrentUserQuery();

    useEffect(() => {
        if (data) {
            dispatch(userExist(data));
        } else if (error) {
            dispatch(userNotExist());
        }
    }, [data, error, dispatch]);

    if (isLoading) return null;

    //   console.log("UserInitializer data:", data);

    return null;
}
