
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This component just redirects to login screen
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
