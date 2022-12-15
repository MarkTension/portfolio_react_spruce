import React, {useEffect} from 'react';
import './App.css';
import Home from "./components/home.js";
import './stylesheets/sidebar.css'
import { isBrowser } from 'react-device-detect';
import { Route, Switch } from "react-router-dom";
import Blog from "./components/blog.js";

import ReactGA from 'react-ga';
const TRACKING_ID = "G-33GQEY07L1";
ReactGA.initialize(TRACKING_ID);


function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App" style={{ background: "yellow" }}>
      <header className="App-header" width="100%" >
        <div id="home" width="100%" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%", background: "darkgray" }}>
          <div style={{ height: "100vh", background: "black", paddingTop: "0%", marginTop: "0%" }}>

            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/blog' component={Blog} />
            </Switch>

          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
