"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the type for user data
interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    country: string;
    city: string;
    postalCode: string;
    taxId: string;
    avatar: string;
}

export default function UserProfilePage() {
    const { id } = useParams();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data: User = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchUserData();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>User not found</div>;
    }

    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row p-6">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl">
                    <ul className="space-y-6">
                        <li className="text-blue-600 font-semibold">
                            {userData.name}
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Security
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Teams
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Team Member
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Notifications
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Billing
                        </li>
                        <li className="text-gray-500 hover:text-primary cursor-pointer">
                            Data Export
                        </li>
                        <button className="text-red-600 bg-red-100 p-3 rounded-xl font-semibold cursor-pointer">
                            Delete Account
                        </button>
                    </ul>
                </div>

                {/* Profile Section */}
                <div className="w-full lg:w-3/4 mt-6 lg:mt-0 lg:ml-6">
                    {/* Profile Overview */}
                    <div className="bg-white p-6 rounded-xl mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        userData.avatar ||
                                        "https://via.placeholder.com/100"
                                    } // User's avatar
                                    alt="User Avatar"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {userData.name}
                                    </h2>
                                    <p className="text-gray-500">
                                        {userData.bio}
                                    </p>
                                    <p className="text-gray-500">
                                        {userData.city}, {userData.country}
                                    </p>
                                </div>
                            </div>
                            <button className="text-blue-600 flex items-center space-x-1 hover:underline">
                                <span>Edit</span>
                                <i className="fas fa-pen"></i>
                            </button>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="bg-white p-6 rounded-xl mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                Personal Information
                            </h3>
                            <button className="text-blue-600 flex items-center space-x-1 hover:underline">
                                <span>Edit</span>
                                <i className="fas fa-pen"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    First Name
                                </label>
                                <p className="text-lg">{userData.firstName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Last Name
                                </label>
                                <p className="text-lg">{userData.lastName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Email address
                                </label>
                                <p className="text-lg">{userData.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Phone
                                </label>
                                <p className="text-lg">{userData.phone}</p>
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-sm font-medium text-gray-500">
                                    Bio
                                </label>
                                <p className="text-lg">{userData.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-white p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Address</h3>
                            <button className="text-blue-600 flex items-center space-x-1 hover:underline">
                                <span>Edit</span>
                                <i className="fas fa-pen"></i>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Country
                                </label>
                                <p className="text-lg">{userData.country}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    City/State
                                </label>
                                <p className="text-lg">{userData.city}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    Postal Code
                                </label>
                                <p className="text-lg">{userData.postalCode}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">
                                    TAX ID
                                </label>
                                <p className="text-lg">{userData.taxId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
