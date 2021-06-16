import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import Navbar from "./Navbar";

export default function Register(props) {
  const history = useHistory();

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputCheck, setInputCheck] = useState(true);
  const [errorFromBE, setErrorFromBE] = useState("");
  const [randFromBE, setRandFromBE] = useState("");
  const [randFromuser, setRandFromUser] = useState("");
  const url = "https://movieinfo-be.herokuapp.com";
  const [codeCheck, setCodeCheck] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (
      name.length === 0 ||
      userName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    )
      setInputCheck(false);
    else {
      setInputCheck(true);
      setLoading(true);
      fetch(`${url}/sendcode`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          targetMail: email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCodeCheck(false);
          setLoading(false);
          if (data.error) setErrorFromBE(data.error);
          else setRandFromBE(data.rand);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const handleRegister = () => {
    if (randFromBE === randFromuser) {
      fetch(`${url}/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: userName,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            history.push({
              pathname: "/login",
              state: { message: "Registration successful. Please login." },
            });
          } else {
            history.push({
              pathname: "/login",
              state: {
                message: "Registration failed. Please register again.",
              },
            });
          }
        });
    } else {
      history.push({
        pathname: "/login",
        state: {
          message: "Registration failed. Secret codes doesn't match.",
        },
      });
    }
  };

  useEffect(() => {
    setErrorFromBE("");
    setCodeCheck(true);
  }, [email]);

  return (
    <div>
      <Navbar page="login" />
      <div className="container mt-3">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <label className="form-label float-start" htmlFor="name">
              name :
            </label>
            <input
              className="form-control "
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <label className="form-label float-start" htmlFor="username">
              username :
            </label>
            <input
              className="form-control "
              id="username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <label className="form-label float-start " htmlFor="email">
              Email :
            </label>
            <input
              className="form-control"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label className="form-label float-start " htmlFor="password">
              password :
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button
              className="btn btn-primary mt-2"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            {inputCheck ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>Please fill all the fields!</p>
            )}
            {loading ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={50}
                timeout={5000}
                className="ms-4"
              />
            ) : codeCheck ? (
              <p></p>
            ) : errorFromBE.length > 0 ? (
              <p style={{ color: "red" }}>{errorFromBE}</p>
            ) : (
              <div>
                <p>
                  A secret code has been sent to your mail. <br />
                  Please enter it here and click "Register".
                </p>
                <input
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) => setRandFromUser(e.target.value)}
                ></input>
                <button
                  className="btn btn-success mt-3 "
                  onClick={() => handleRegister()}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
