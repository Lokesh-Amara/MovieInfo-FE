import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Navbar from "./Navbar";
import DisplayList from "./DisplayList";
import SearchBox from "./SearchBox";

export default function Home() {
  const url = "https://movieinfo-be.herokuapp.com";
  //const url = "http://localhost:3001";
  const [newMoviesList, setNewMoviesList] = useState([]);
  const [popularMoviesList, setpopularMoviesList] = useState([]);
  const [dramasList, setdramasList] = useState([]);
  const [actionList, setactionList] = useState([]);
  const [documentaryList, setdocumentaryListt] = useState([]);
  const [scifiList, setscifiList] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/movieslist`)
      .then((res) => res.json())
      .then((data) => {
        setNewMoviesList([...data.slice(0, 40)]);
        setpopularMoviesList([...data.slice(40, 80)]);
        setdramasList([...data.slice(80, 120)]);
        setactionList([...data.slice(120, 160)]);
        setdocumentaryListt([...data.slice(160, 200)]);
        setscifiList([...data.slice(200, 240)]);
        setAllMovies([...data]);
      });

    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <Navbar page="home" />
      <SearchBox allMovies={allMovies} />
      <div style={{ position: "relative" }}>
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>New Movies</i>
        </h3>
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
          <DisplayList moviedata={newMoviesList} />
        )}
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Popular Movies</i>
        </h3>
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
          <DisplayList moviedata={popularMoviesList} />
        )}
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Dramas</i>
        </h3>
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
          <DisplayList moviedata={dramasList} />
        )}
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Action Movies</i>
        </h3>
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
          <DisplayList moviedata={actionList} />
        )}
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Documentary</i>
        </h3>
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
          <DisplayList moviedata={documentaryList} />
        )}
        <h3 className="ms-3 mt-3" style={{ color: "#82C91E" }}>
          <i>Sci-Fi Movies</i>
        </h3>
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
          <DisplayList moviedata={scifiList} />
        )}
      </div>
    </div>
  );
}
