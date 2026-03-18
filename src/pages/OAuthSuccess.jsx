// /src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  // Only process if token exists and not already stored
  if (token && !localStorage.getItem("access_token")) {
    localStorage.setItem("access_token", token);
    window.history.replaceState({}, document.title, "/dashboard");
    navigate("/dashboard");
  }
}, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthSuccess;