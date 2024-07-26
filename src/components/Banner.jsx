import React, { useEffect, useState } from "react";
import instance from "../instance";
import "./Banner.css";
function Banner({ fetchUrl }) {
  console.log("banner fetch url", fetchUrl);
  const image_base_url = "https://image.tmdb.org/t/p/original";
  const [movie, setMovie] = useState({});

  const fetchData = async () => {
    try {
      const result = await instance.get(fetchUrl);
      const { data } = result;
      console.log("random data results", data.results.length);
      setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      console.log(data.results[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchData();
    }, 5000);
  }, []);

  console.log("====movieList=====");
  console.log(movie);

  return (
    <div
      style={{
        height: "600px",
        backgroundImage: `url(${image_base_url}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner_content">
        <h2>{movie?.name || movie?.title}</h2>
        <button className="btn btn-danger me-3">
          Play <i className="fa-solid fa-play"></i>
        </button>
        <button className="btn btn-outline-dark">
          More Info <i className="fa-solid fa-caret-down"></i>
        </button>
        <h3>{movie?.overview?.slice(0, 200)}...</h3>
      </div>
    </div>
  );
}

export default Banner;
