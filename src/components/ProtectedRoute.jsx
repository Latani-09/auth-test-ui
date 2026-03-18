import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token"); // or however you store it

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}