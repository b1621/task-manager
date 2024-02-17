import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log("children", user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" user 11 ");
    if (!user || user == {}) {
      console.log("no user ");
      navigate("/login");
    }
  }, [navigate, user]);

  return children;
};

export default ProtectRoute;
