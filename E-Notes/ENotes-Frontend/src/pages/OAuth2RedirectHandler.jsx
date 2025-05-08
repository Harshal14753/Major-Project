import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../context/UserContext";

export default function OAuth2RedirectHandler() {
  const {login} = useUserContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", decoded.email);
      localStorage.setItem("role", decoded.role);

      login({
        fullname: "", // GitHub might not return full name unless handled
        email: decoded.email,
        role: decoded.role,
      });

      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return <p>Logging in...</p>;
}
