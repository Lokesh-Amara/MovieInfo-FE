import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import DisplayList from "./DisplayList";
import Navbar from "./Navbar";

export default function UserProfile() {
  const url = "https://movieinfo-be.herokuapp.com";
  //const url = "http://localhost:3001";
  const [user, setUser] = useState("");
  const [watchList, setWatchList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [watchButton, setWatchButton] = useState(false);
  const [watchButtonClick, setWatchButtonClick] = useState(false);
  const [likeButton, setLikeButton] = useState(false);
  const [likeButtonClick, setLikeButtonClick] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  const getWatchList = () => {
    setLoading1(true);
    fetch(`${url}/getwatchlist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading1(false);
        if (data.status === "success") setWatchList(data.data);
      })
      .catch((err) => {
        setLoading1(false);
        console.log(err);
      });

    setWatchButton(true);
    setWatchButtonClick(true);
  };

  const getLikedList = () => {
    setLoading2(true);
    fetch(`${url}/getlikedlist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading2(false);
        if (data.status === "success") setLikeList(data.data);
      })
      .catch((err) => {
        setLoading2(false);
        console.log(err);
      });

    setLikeButton(true);
    setLikeButtonClick(true);
  };

  return (
    <div>
      <Navbar page="userprofile" />
      <div style={{ textAlign: "left" }}>
        <button
          className="btn btn-success mt-5 ms-3"
          onClick={() => getWatchList()}
        >
          My watch list
        </button>
        {watchButton && watchList.length > 0 ? (
          <DisplayList moviedata={watchList} />
        ) : watchButtonClick && loading1 ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={50}
            timeout={5000}
            className="ms-4"
          />
        ) : watchButtonClick ? (
          <p style={{ color: "red" }} className="ms-3 mt-3">
            No movies found in your watch list.
          </p>
        ) : (
          <span></span>
        )}
        <br />
        <button
          className="btn btn-success mt-3 ms-3"
          style={{ display: "block" }}
          onClick={() => getLikedList()}
        >
          Liked movies
        </button>
        {likeButton && likeList.length > 0 ? (
          <DisplayList moviedata={likeList} />
        ) : likeButtonClick && loading2 ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={50}
            timeout={5000}
            className="ms-4"
          />
        ) : likeButtonClick ? (
          <p style={{ color: "red" }} className="ms-3 mt-3">
            No movies found in your list.
          </p>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
