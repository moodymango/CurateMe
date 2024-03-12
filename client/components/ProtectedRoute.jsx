import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider.jsx";

function ProtectedRoute() {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
