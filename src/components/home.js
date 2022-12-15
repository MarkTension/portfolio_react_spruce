import React from 'react';
import '../App.css';
import Sidebar from "./sidebar.js";
import Blog from "./blog";
import Landing from "./landing.js";
import GenerativePortfolio from "./generativePortfolio.js";
import Music from "./music.js";
import '../stylesheets/sidebar.css'
import { isBrowser } from 'react-device-detect';


function Home() {

  return (
    <div className="App" >
      <div id="home" width="100%" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%" }}>

        <Landing width="100%" style={{ background: "black", marginTop: "0%" }} />
        <Blog />
        <div width="100%">
          <GenerativePortfolio width="100%" />
        </div>
        <Music width="100%" />
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
