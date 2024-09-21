"use client";

import UsersTable from "@/components/UsersTable";
import React, { useState } from "react";

export default function page() {
    return (
        <div className="min-h-screen bg-gray-100 p-4 max-w-screen">
            <div className="flex justify-center items-center">
                <UsersTable />
            </div>
        </div>
    );
}
