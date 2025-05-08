import React from 'react'
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { saveUser } from '../services/UserService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        mobileNo: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await saveUser(formData);
            navigate("/home")
            toast.success(response.message)
        } catch (error) {
            toast.error("User not created!")
        }
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <div className="text-center">
                    <img
                        className="mx-auto h-12"
                        src="https://www.svgrepo.com/show/301692/login.svg"
                        alt="Register"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Create a new account</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Or <a href="/login" className="text-blue-600 hover:underline">login to your account</a>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="form-control">
                        <label className="label">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="John Doe"
                                className="input input-bordered w-full pl-10"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                            <FaUser className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Address</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                className="input input-bordered w-full pl-10"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Mobile No.</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="mobileNo"
                                placeholder="Enter mobile number"
                                className="input input-bordered w-full pl-10"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                required
                            />
                            <FaPhone className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="user@example.com"
                                className="input input-bordered w-full pl-10"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="input input-bordered w-full pl-10"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete='password'
                            />
                            <FaLock className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                className="input input-bordered w-full pl-10"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                autoComplete='confirmPassword'
                            />
                            <FaLock className="absolute left-3 top-3 text-gray-500" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary w-full">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register