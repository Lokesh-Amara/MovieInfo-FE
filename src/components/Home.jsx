import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import DisplayList from "./DisplayList";
import SearchBox from "./SearchBox";

export default function Home() {
  const url = "https://movieinfo-be.herokuapp.com";
  const [newMoviesList, setNewMoviesList] = useState([]);
  const [popularMoviesList, setpopularMoviesList] = useState([]);
  const [dramasList, setdramasList] = useState([]);
  const [actionList, setactionList] = useState([]);
  const [documentaryList, setdocumentaryListt] = useState([]);
  const [scifiList, setscifiList] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    fetch(`${url}/movieslist`)
      .then((res) => res.json())
      .then((data) => {
        setNewMoviesList([...data.slice(0, 40)]);
        setpopularMoviesList([...data.slice(41, 80)]);
        setdramasList([...data.slice(81, 120)]);
        setactionList([...data.slice(121, 160)]);
        setdocumentaryListt([...data.slice(161, 200)]);
        setscifiList([...data.slice(201, 240)]);
        setAllMovies([...data]);
      });
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <Navbar page="home" />
      <SearchBox allMovies={allMovies} />
      <div style={{ position: "relative" }}>
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>New Movies</i>
        </h3>
        <DisplayList moviedata={newMoviesList} />
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Popular Movies</i>
        </h3>
        <DisplayList moviedata={popularMoviesList} />
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Dramas</i>
        </h3>
        <DisplayList moviedata={dramasList} />
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Action Movies</i>
        </h3>
        <DisplayList moviedata={actionList} />
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Documentary</i>
        </h3>
        <DisplayList moviedata={documentaryList} />
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Sci-Fi Movies</i>
        </h3>
        <DisplayList moviedata={scifiList} />
      </div>
    </div>
  );
}
