import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { userData } = useSelector((state) => state.user);
  return userData ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
