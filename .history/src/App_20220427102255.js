import React from 'react';
import './App.css';
import Sidebar from "./components/sidebar.js";
import Landing from "./components/landing.js";
import GenerativePortfolio from "./components/generativePortfolio.js";

import Music from "./components/music.js";
import './stylesheets/sidebar.css'
import {isBrowser} from 'react-device-detect';
import { BrowserRouter, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/OnePost.js";


function SidebarIfBrowser() {

  if (isBrowser) {
    return <Sidebar />
  }
  else{
    return null
  }
}



function App() {
  return (    
    <div className="App" style={{background: "yellow"}}>
      <header className="App-header" width="100%" >
        <div id="home" width="100%"  style={{marginLeft: isBrowser ? "15%" : "0%" ,marginRight:"0%",padding:"0%", background: "red"}}>
          <div id="schmoooo" style={{height:"100vh", width:"80w", background: "black", paddingTop:"0%", marginTop:"0%"}}>

          <Landing width="100%" style={{height:"100vh", background: "black", marginTop: "0%"}} />

          </div>
          {/* {/* <GenerativePortfolio style={{height:"100vh", width:"100vw"}} /> */}

          <BrowserRouter id="blog">
            <div style={{ width:"100vw"}}>
              <Route component={AllPosts} path="/" exact />
              <Route component={OnePost} path="/:slug" />
            </div>
          </BrowserRouter>
          <Music style={{ width:"100vw"}} /> */}
        </div>
        
        {/* <SidebarIfBrowser /> */}

      </header>
    </div>
  );
}

export default App;