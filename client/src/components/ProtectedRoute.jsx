// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return;
  <ClipLoader
    size={50} // default: 35
    color={"#123abc"} // default: #000
    loading={true} // boolean to toggle visibility
  />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};

export default ProtectedRoute;
