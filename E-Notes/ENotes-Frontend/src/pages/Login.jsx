import React from 'react'
import { useState } from "react";
import toast from 'react-hot-toast';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { getUserData, userLogin } from '../services/UserService';
import { useUserContext } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode';
import googleImage from '../assets/image/google.png';
import githubImage from '../assets/image/github.png';


const Login = () => {

    const { fetchUserProfile } = useUserContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await userLogin({ email, password });

            // Check if login was successful
            if (response.status === 200) {
                const decoded = jwtDecode(response.data.token);

                // // Save token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userEmail", JSON.stringify(response.data.email));
                localStorage.setItem("role", decoded.role);

                // // Fetch user details after login
                fetchUserProfile(response.data.token);

                toast.success("Login successful!");
                navigate("/home"); // Redirect to home page
            } else {
                setError("Invalid credentials.");
                toast.error("Invalid credentials.");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
            toast.error(error.response?.data?.message || "Something went wrong." + error);
        }
    }

    const handleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential; // Google ID token
        try {
            const res = await axios.post('http://localhost:8080/api/auth/google', { token });
            localStorage.setItem('jwt', res.data.jwt);
            // Redirect or set auth state
        } catch (err) {
            console.error("Google login failed", err);
        }
    };

    const handleGithubLogin = () => {
        // You can redirect to GitHub OAuth URL here
        window.location.href = "GITHUB_LOGIN_URL";
    };


    return (
        <>
            <section className="flex min-h-[70vh] flex-col mt-4 px-6 py-1 lg:px-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
                    <img className="mx-auto h-20 w-auto" src="/src/images/signin_logo.jpg" alt="Your Company" />
                    <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={loginSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="username"
                                    type="text"
                                    placeholder="Enter email"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FaEnvelope className="absolute inset-y-0 left-3 top-3 text-gray-500" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    required
                                    className="input input-bordered w-full pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='password'
                                />
                                <FaLock className="absolute inset-y-0 left-3 top-3 text-gray-500" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Sign in
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-500">Or</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="space-y-4">
                        {/* Google Login Button using @react-oauth/google */}
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded px-3 py-2 bg-white hover:bg-blue-50"
                        onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}>
                            <img
                                src={googleImage}
                                alt="Google"
                                className="w-5 h-5 mr-2"
                            />
                            <span className="text-sm text-gray-700 text-center w-full">Sign in with Google</span>
                        </button>
                        {/* GitHub Styled Button */}
                        <button className="flex items-center justify-center w-full border border-gray-300 rounded px-3 py-2 bg-white hover:bg-blue-50"
                        onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/github"}>
                            <img
                                src={githubImage}
                                alt="GitHub"
                                className="w-5 h-5 mr-2"
                            />
                            <span className="text-sm text-gray-700 text-center w-full">Sign in with GitHub</span>
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member? <a href="/register" className="text-indigo-600 hover:text-indigo-500">Register</a>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Login