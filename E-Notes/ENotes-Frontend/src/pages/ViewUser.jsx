import React, { useEffect, useState } from 'react'
import { getAllUser } from '../services/UserService';
import { useUserContext } from '../context/UserContext';

const ViewUser = () => {
    const { user } = useUserContext();
    const [users, setUsers] = useState([{
        id: '',
        fullname: '',
        email: '',
        address: '',
        mobileNo: '',
        role: '',
    },]);

    useEffect(() => {

        async function fetchData() {
            try {
                const response = await getAllUser(localStorage.getItem("token"))
                console.log("ViewUser")
                console.log(response)
                setUsers(response);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    // const sortedUsers = [...users].sort((a, b) => a.id - b.id);

    return (
        <div className="min-h-[72vh] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">📋 User List</h2>
                <div className="overflow-auto rounded-xl shadow-sm">
                    <table className="min-w-full table-auto divide-y divide-gray-300">
                        <thead className="bg-indigo-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Mobile No</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-indigo-50 transition duration-200 ease-in-out"
                                >
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.fullname}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.address}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.mobileNo}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'ROLE_ADMIN'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-600'
                                                }`}
                                        >
                                            {user.role.replace('ROLE_', '')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewUser