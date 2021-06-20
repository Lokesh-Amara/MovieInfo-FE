import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import Navbar from "./Navbar";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const url = "https://movieinfo-be.herokuapp.com";
  //const url = "http://localhost:3001";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCheck, setUserCheck] = useState(true);
  const [passCheck, setPassCheck] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setErrorMessage("");
    if (username.length === 0) setUserCheck(false);
    else if (password.length === 0) setPassCheck(false);
    else {
      setLoading(true);
      fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.status === "success") {
            sessionStorage.setItem("loggedInUser", username);
            history.push("/");
          } else {
            setErrorMessage(data.status);
          }
        });
    }
  };

  useEffect(() => setUserCheck(true), [username]);
  useEffect(() => setPassCheck(true), [password]);
  return (
    <div>
      <Navbar page="login" />
      <p>{location.state?.message}</p>
      <div className="container mt-3">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <label className="form-label float-start" htmlFor="username">
              username :
            </label>
            <input
              className="form-control "
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            {userCheck ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>Username is required!</p>
            )}
            <label className="form-label float-start mt-2" htmlFor="password">
              password :
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {passCheck ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>Password is required!</p>
            )}
            <button
              className="btn mt-3"
              style={{ backgroundColor: "#52BF80" }}
              onClick={() => handleClick()}
            >
              Signin
            </button>
            {errorMessage.length > 0 ? (
              <p style={{ color: "red" }}>{errorMessage}</p>
            ) : (
              <p></p>
            )}
            <p className="mt-3">
              Don't have an account ?
              <span
                onClick={() => history.push("/register")}
                style={{ display: "inline", color: "blue" }}
              >
                <u> Register here..</u>
              </span>
            </p>
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={50}
                timeout={5000}
                className="ms-4"
              />
            ) : (
              <span></span>
            )}
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
}
