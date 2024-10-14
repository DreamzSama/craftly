"use client";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-screen max-w-screen overflow-hidden">
            {session && <Sidebar />}
            <div className="flex-1 bg-gray-100 overflow-y-auto w-full max-w-full">
                {children}
            </div>
        </div>
    );
}
