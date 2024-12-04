import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/login";
import Admin from "./components/admin";
import { authApi } from "../api/authApi";
import { checkUser } from "../store/slices/authSlices";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const localId = localStorage.getItem("_CM_id");

    (async () => {
      try {
        const res = await authApi.findAdmin(localId);
        console.log(res);
        if (res.status === 404 || res.data.status !== 200) {
          dispatch(checkUser({}));
        } else {
          dispatch(checkUser(res));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div className="home">{user?.admin ? <Admin /> : <Login />}</div>;
};

export default Home;
