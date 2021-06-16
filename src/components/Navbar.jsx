import React from "react";
import { useHistory } from "react-router-dom";

export default function Navbar(props) {
  const history = useHistory();
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  return (
    <div>
      <nav
        className="navbar navbar-dark  "
        style={{
          textAlign: "right",
          position: "fixed",
          width: "100%",
          backgroundColor: "#7952B3",
          top: "0px",
          marginBottom: "38px",
        }}
      >
        <div style={{ width: "100%" }}>
          <button
            className="btn float-start ms-3"
            style={{ color: "white" }}
            onClick={() => history.push("/")}
          >
            Home
          </button>
          {props.page !== "login" ? (
            loggedInUser !== "defaultUser" ? (
              <div>
                <button className="btn" style={{ color: "white" }}>
                  👤 {loggedInUser}
                </button>
                <button
                  className="btn me-3"
                  style={{ color: "white" }}
                  onClick={() => {
                    sessionStorage.setItem("loggedInUser", "defaultUser");
                    history.push("/login");
                  }}
                >
                  logout
                </button>
              </div>
            ) : (
              <button
                className="btn me-3"
                style={{ color: "white" }}
                onClick={() => history.push("/login")}
              >
                Login/Register
              </button>
            )
          ) : (
            <p></p>
          )}
        </div>
      </nav>
      <div style={{ height: "75px" }}></div>
    </div>
  );
}
