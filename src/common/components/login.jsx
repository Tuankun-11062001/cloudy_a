import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/slices/authSlices";

const Login = () => {
  const { error } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const [loginData, setLoginData] = useState({
    userEmail: "nhoxtuanhero1@gmail.com",
    userPassword: "",
  });
  const handleChange = (e) => {
    setLoginData((prev) => {
      return {
        ...prev,
        userPassword: e.target.value,
      };
    });
  };

  const handleSubmit = () => {
    console.log(loginData);
    dispath(loginThunk(loginData));
  };

  return (
    <div className="login">
      <h1>Cloudy Manager</h1>
      <input
        type="password"
        placeholder="Password Admin..."
        value={loginData.userPassword}
        onChange={handleChange}
      />
      <p onClick={handleSubmit}>Submit</p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
