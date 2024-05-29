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
            <Landing style={{ background: "black", marginTop: "0%" }} />

            <div id="home" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%" }}>

                <Blog />
                <Music />
            </div>
            <Sidebar />
        </div>
    );
}

export default Home;
