"use client";

import { getBalances } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Balances() {
    const [balances, setBalances] = useState(null);

    useEffect(() => {
        getBalances()
            .then(data => {
                setBalances(data);
            })
            .catch(err => console.error("Error fetching balances:", err));
    }, []);

    console.log("Balances in component:", balances);

    return (
        <pre>
            {balances ? JSON.stringify(balances, null, 2) : "Loading balances..."}
        </pre>
    );
}
