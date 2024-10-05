import React from "react";
import "../App.css";
import Blog from "./blog";
import Landing from "./landing.js";
import Music from "./music.js";
function Home({ slug }) {
  return (
    <div className="App">
      <Landing style={{ background: "black", marginTop: "0%" }} />
      <div
        id="home"
        style={{ marginLeft: "15%", marginRight: "0%", padding: "0%" }}
      >
        <Blog slug={slug} />
      </div>
      <Music />
    </div>
  );
}

export default Home;
