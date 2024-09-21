import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State for filtered users

    // Fetch user data from the API
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users"); // Replace with your API endpoint
                const data = await response.json();
                setUsers(data);
                setFilteredUsers(data); // Initialize filtered users with the entire list
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, []);

    // Handle search functionality
    useEffect(() => {
        const filtered = users.filter((user) =>
            (user.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.address?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.city?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (user.country?.toLowerCase() || "").includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered); // Update the filtered users based on the search query
    }, [searchQuery, users]); // Recalculate filtered users when searchQuery or users change

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="w-full rounded-xl">
            {/* Search Input */}
            <div className="p-4 rounded-xl mb-4 bg-white">
                <input
                    type="search"
                    placeholder="Search by name, email, address, or city"
                    className="w-full bg-gray-100 p-2 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                />
            </div>
            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg">
                <table className="table rounded-lg">
                    {/* Table header */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox border-gray-400 [--chkbg:theme(colors.primary)] [--chkfg:white] checked:border-primary"
                                    />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox border-gray-400 [--chkbg:theme(colors.primary)] [--chkfg:white] checked:border-primary"
                                            />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-bold">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {user.country}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <th>
                                        <Link href={`/kontakte/${user.id}`}>
                                            <button className="btn btn-ghost btn-xs">
                                                Details
                                            </button>
                                        </Link>
                                    </th>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {/* Table footer */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

const Spinner = () => (
    <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
);
