import React from 'react';
import '../App.css';
import Sidebar from "./sidebar.js";
import Blog from "./blog";
import Landing from "./landing.js";
// import Landing2 from "./landing2.js";
import GenerativePortfolio from "./generativePortfolio.js";
import Music from "./music.js";
import '../stylesheets/sidebar.css'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { isBrowser } from 'react-device-detect';
import {  } from "react-router-dom";

function SidebarIfBrowser() {

  return <Sidebar />

}




function Home() {

  return (
    <div className="App" >
        <div id="home" width="100%" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%" }}>
          
          <Landing width="100%" style={{background: "black", marginTop: "0%"}} /> 
          {/* height:"100vh",  */}
          <Blog  />
          <div  width="100%">
            <GenerativePortfolio width="100%" />
          </div>
          <Music width="100%" />
        </div>
        <SidebarIfBrowser />
    </div>
  );
}

export default Home;
