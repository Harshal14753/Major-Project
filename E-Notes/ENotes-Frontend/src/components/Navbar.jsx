import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { FaBook, FaArrowRight } from "react-icons/fa";
import { useUserContext } from '../context/UserContext';

const Navbar = () => {

  const { user, isAuthenticated } = useUserContext();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"))
  }, [user]);


  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <FaBook className="w-16 h-16 p-2" />
          <span className="ml-3 text-5xl">ENotes</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link className="mr-5 hover:text-gray-900" to="/home">Home</Link>
          <Link className="mr-5 hover:text-gray-900" to="/about">About</Link>
          <button
            className="mr-5 hover:text-gray-900"
            onClick={() => document.getElementById("footer").scrollIntoView({ behavior: "smooth" })}
          >
            Contact
          </button>
        </nav>

        {isAuthenticated ? (
          role === "ROLE_USER" ? (
            <>
              <Link to="/user/addNotes">
                <button className="btn btn-primary flex items-center gap-2 m-2">
                  Add Notes <FaArrowRight />
                </button>
              </Link>
              <Link to="/user/viewNotes">
                <button className="btn btn-primary flex items-center gap-2 mr-2">
                  View Notes <FaArrowRight />
                </button>
              </Link>
              <Link to="/profile">
                <button className="btn btn-primary flex items-center gap-2">
                  Profile <FaArrowRight />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/admin/viewUser">
                <button className="btn btn-primary flex items-center gap-2 mr-2">
                  View User Data <FaArrowRight />
                </button>
              </Link>
              <Link to="/profile">
                <button className="btn btn-primary flex items-center gap-2">
                  Profile <FaArrowRight />
                </button>
              </Link>
            </>
          )
        ) : (
          <>
            <Link to="/auth/login">
              <button className="btn btn-primary flex items-center gap-2 m-2">
                Login <FaArrowRight />
              </button>
            </Link>
            <Link to="/auth/register">
              <button className="btn btn-primary flex items-center gap-2">
                Register <FaArrowRight />
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar