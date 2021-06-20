import React, { useState } from "react";
import { useLocation } from "react-router";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";

export default function MovieInfo() {
  const location = useLocation();
  const history = useHistory();
  const data = location.state?.data;
  const url = "https://movieinfo-be.herokuapp.com";
  //const url = "http://localhost:3001";
  const [watchListMessage, setWatchListMessage] = useState("");
  const [likedListMessage, setLikedListMessage] = useState("");

  const addToWatchList = () => {
    setWatchListMessage("");
    fetch(`${url}/updatewatchlist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("loggedInUser"),
        moviename: data.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => setWatchListMessage(data.status));
  };

  const addToLikedList = () => {
    setLikedListMessage("");
    fetch(`${url}/updatelikedlist`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("loggedInUser"),
        moviename: data.name,
      }),
    })
      .then((res) => res.json())
      .then((data) => setLikedListMessage(data.status));
  };

  return (
    <div>
      <Navbar page="movieinfo" />
      <div style={{ width: "100%" }}>
        <button
          className="btn btn-success ms-3 float-start"
          onClick={() => history.goBack()}
        >
          <i className="fas fa-backward"></i> Go Back
        </button>
      </div>
      <div className="container mt-3 mb-5">
        <div className="row">
          <div className="col-5">
            <img
              src={data.image.original}
              style={{ height: "500px" }}
              className="img-fluid"
              alt=""
            ></img>
          </div>
          <div className="col-7" style={{ textAlign: "justify" }}>
            <h3 className="mt-2">{data.name}</h3>
            <span>
              <i>{parse(data.summary)}</i>
            </span>
            <ul>
              <li>Language : {data.language}</li>
              <li>Genres : {data.genres.join(", ")}</li>
              <li>Type : {data.type}</li>
              <li>
                Official site :
                <a href={data.officialSite} target="_blank" rel="noreferrer">
                  {data.officialSite}
                </a>
              </li>
              <li>Premiered : {data.premiered}</li>
              <li>Rating : {data.rating.average} ⭐</li>
              <li> Network : {data.network.name}</li>
              <li> Country : {data.network.country.name}</li>
              <li> IMDB : {data.externals.imdb}</li>
              <li> TVDB : {data.externals.thetvdb}</li>
              <li>
                Url :
                <a href={data.url} target="_blank" rel="noreferrer">
                  {data.url}
                </a>
              </li>
            </ul>
            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={() => addToWatchList()}
            >
              ➕ &nbsp; Add to watchlist &nbsp; &nbsp; &nbsp; &nbsp;
            </button>
            {watchListMessage.length > 0 ? (
              <p
                className="mt-3 ms-3 mb-3"
                style={{ color: "green", display: "inline-block" }}
              >
                {watchListMessage}
              </p>
            ) : (
              <span></span>
            )}
            <br />
            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={() => addToLikedList()}
            >
              ❤️&nbsp; Like &nbsp; &nbsp;
            </button>
            {likedListMessage.length > 0 ? (
              <p
                className="mt-3 ms-3 mb-3"
                style={{ color: "green", display: "inline-block" }}
              >
                {likedListMessage}
              </p>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
