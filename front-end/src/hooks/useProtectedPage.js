import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../router/Coordinator";

const useProtectedPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      goToLoginPage(navigate);
    }
  }, [navigate]);
};

export default useProtectedPage;
