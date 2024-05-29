import React, { useEffect } from 'react';
import './App.css';
import Home from "./components/home.js";
import './stylesheets/sidebar.css'
import { isBrowser } from 'react-device-detect';
import { Route, Switch } from "react-router-dom";
import Blog from "./components/blog.js";

import ReactGA from 'react-ga';
ReactGA.initialize("G-1NMXEJHGQG");
ReactGA.pageview(window.location.pathname + window.location.search);


function App() {
    ReactGA.pageview(window.location.pathname);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="App" style={{ background: "yellow" }}>
            <header className="App-header">
                <div id="home" style={{ marginLeft: isBrowser ? "15%" : "0%", marginRight: "0%", padding: "0%", background: "black" }}>
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
