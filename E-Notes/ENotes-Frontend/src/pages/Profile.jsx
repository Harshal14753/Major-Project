import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { getUserData, userLogout } from '../services/UserService';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router';

const Profile = () => {

  const { user, logout } = useUserContext();

  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await userLogout();

      if (response.status === 200) {
        logout(); // Clear user context on success
        localStorage.removeItem("token"); 
        localStorage.removeItem("userEmail"); 
        localStorage.removeItem("role"); 
        navigate("/home");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {

      const storedEmail = user?.email || JSON.parse(localStorage.getItem("userEmail"));

      if (user?.email) {
        try {
          const data = await getUserData(storedEmail);
          console.log(" User data:", data);
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [user]);  // Empty dependency array → Runs only when the Profile component is mounted
  
  // If we add the dependency like [user] then Runs when `user` changes

  return (
    <section className="bg-gray-100 min-h-[72vh] flex flex-col justify-center py-7 sm:px-2 lg:px-8">
      <div className="sm:mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">User Profile Page</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <FaUser className="text-blue-500" /> <span className="font-bold">Name:</span> {userData?.fullname}
          </p>
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> <span className="font-bold">Email:</span> {userData?.email}
          </p>
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <FaPhone className="text-blue-500" /> <span className="font-bold">Mobile No.:</span> {userData?.mobileNo}
          </p>
          <p className="text-gray-600 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" /> <span className="font-bold">Address:</span> {userData?.address}
          </p>
          <button onClick={handleLogout}
            className="btn btn-primary flex items-center gap-2 mt-4"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </section>
  )
}

export default Profile