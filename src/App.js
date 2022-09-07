import React from 'react';
import './App.css';
import Sidebar from "./components/sidebar.js";
import Landing from "./components/landing.js";
import Home from "./components/home.js";
import './stylesheets/sidebar.css'
import { isBrowser } from 'react-device-detect';
import { HashRouter, Route, Link, Switch } from "react-router-dom";
// import AllPosts from "./components/AllPosts.js";
// import OnePost from "./components/OnePost.js";
import Blog from "./components/blog.js";


function SidebarIfBrowser() {

  if (isBrowser) {
    return <Sidebar />
  }
  else {
    return null
  }
}



function App() {
  return (
    <div className="App" style={{ background: "yellow" }}>
      <header className="App-header" width="100%" >
        <div id="home" width="100%" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%", background: "darkgray" }}>
          <div id="schmoooo" width="100%" style={{ height: "100vh", background: "black", paddingTop: "0%", marginTop: "0%" }}>

            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/blog' component={Blog} />
            </Switch>

          </div>
        </div>

        {/* <SidebarIfBrowser /> */}

      </header>
    </div>
  );
}

export default App;
