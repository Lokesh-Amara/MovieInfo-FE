import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function SearchBox(props) {
  const history = useHistory();

  const [searchSugg, setSearchSugg] = useState([]);
  const allMovies = props.allMovies;
  const [dropList, setDropList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  var searchInputList = [];

  useEffect(() => {
    const x = searchSugg;
    for (const v of x) {
      searchInputList.push(<SearchInput value={v} key={v} />);
    }
    setDropList([...searchInputList]);
  }, [searchSugg]);

  const SearchInput = (props) => {
    return (
      <div>
        <input
          type="text"
          key={props.value}
          className="form-control "
          style={{
            width: "60%",
            display: "inline-block",
            position: "relative",
            right: "45px",
          }}
          value={props.value}
          readOnly="readonly"
          onClick={() => {
            document.getElementById("inputbox").value = props.value;
            setSearchString(props.value);
            setSearchSugg([]);
          }}
        ></input>
      </div>
    );
  };

  const handleChange = (val) => {
    setDropList([]);
    setInvalidName(false);
    if (val.length > 2) {
      const resArr = [];
      for (const v of allMovies) {
        if (v.name.toLowerCase().includes(val.toLowerCase())) {
          resArr.push(v.name);
          if (resArr.length === 5) break;
        }
      }
      setSearchSugg(resArr);
    }
  };

  const handleClick = () => {
    const moviedata = {};
    for (const v of allMovies) {
      if (v.name === searchString) {
        Object.assign(moviedata, v);
      }
    }
    if (Object.keys(moviedata).length === 0) setInvalidName(true);
    else {
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
            data: moviedata,
          },
        });
      }
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          id="inputbox"
          className="form-control "
          style={{ width: "60%", display: "inline-block" }}
          onChange={(e) => handleChange(e.target.value)}
        ></input>
        <button
          className="btn btn-success "
          style={{ position: "relative", bottom: "3px" }}
          onClick={() => handleClick()}
        >
          <i className="fas fa-search"></i> Search
        </button>
        {invalidName ? <p>Movie not found</p> : <span></span>}
        {dropList}
      </div>
    </div>
  );
}
