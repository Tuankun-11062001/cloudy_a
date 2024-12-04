import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "../api/authApi";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const localId = localStorage.getItem("_CM_id");
    if (!localId) {
      setLoading(false);
      return setIsAuthorized(false);
    }

    (async () => {
      try {
        const res = await authApi.findAdmin(localId);
        console.log(res);
        if (res.status === 404 || res.data.status !== 200) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      } finally {
        setLoading(false); // Đặt loading thành false khi hoàn thành
      }
    })();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Có thể hiển thị loader ở đây
  }
  return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
