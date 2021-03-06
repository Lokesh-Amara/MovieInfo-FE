import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function DisplayList(props) {
  const arrList = [];
  const history = useHistory();

  const DisplayPoster = (props) => {
    return (
      <div
        className="border   mt-3 ms-3 me-3"
        style={{ display: "inline-block", textAlign: "center" }}
        onClick={() => {
          if (sessionStorage.getItem("loggedInUser") === "defaultUser") {
            history.push({
              pathname: "/login",
              state: {
                message: "Please login to access movie info.",
              },
            });
          } else {
            history.push({
              pathname: "/movieinfo",
              state: {
                data: props.data,
              },
            });
          }
        }}
      >
        <img
          src={props.data.image.original}
          alt=""
          className="img-fluid img-thumbnail mb-3"
          style={{ width: "150px", height: "150px" }}
        ></img>
        <br />
        <p className="d-inline " style={{ color: "#4778BF" }}>
          <b>{props.data.name.toString().slice(0, 15)}</b>
        </p>
      </div>
    );
  };

  for (const movie of props.moviedata) {
    arrList.push(<DisplayPoster key={movie.name} data={movie} />);
  }

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);

  const handleClick = () => {
    if (end + 6 < arrList.length - 1) {
      setStart(start + 6);
      setEnd(end + 6);
    } else if (end + 6 > arrList.length - 1 && start + 6 < arrList.length - 1) {
      setStart(start + 6);
      setEnd(arrList.length - 1);
    } else {
      setStart(0);
      setEnd(6);
    }
  };
  return (
    <div>
      {[...arrList.slice(start, end)]}
      {props.moviedata.length > 6 ? (
        <button
          className="btn ms-5"
          style={{
            // width: "152px",
            // height: "192px",
            position: "relative",
            bottom: "85px",
          }}
          onClick={() => handleClick()}
        >
          <i className="fas fa-chevron-right fa-4x"></i>
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
}
