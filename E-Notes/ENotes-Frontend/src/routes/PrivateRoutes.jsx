import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../context/UserContext";
import { element } from "prop-types";

// Protect Routes
const PrivateRoute = ({element, roles }) => {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/auth/login" replace />; // Redirect if not logged in
  if (roles && !roles.includes(user.role)){ 

    return  <Navigate to="/unauthorized" replace />
  };  // Role-based restriction

  return element;
};

export default PrivateRoute;