import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log("children", isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" user 11 ");
    if (!isAuthenticated) {
      console.log("no user ");
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default ProtectRoute;
