import React, { useEffect } from 'react';
import './App.css';
import Home from "./components/home.js";
import './stylesheets/sidebar.css'
import { isBrowser } from 'react-device-detect';
import { Route, Switch } from "react-router-dom";
import Blog from "./components/blog.js";

import { Helmet, HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
ReactGA.initialize("G-33GQEY07L1");
// ReactGA.pageview(window.location.pathname + window.location.search);


function App() {
    // ReactGA.pageview(window.location.pathname);

    // useEffect(() => {
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Mark Tensen's Blog: Exploring Software Engineering, Artificial Life, Electronic Music, and generative AI</title>
                <meta name="description" content="Exploring the generative AI, Artificial Life, and electronic music production. 
                Reflections on generative, MaxMSP devices, and creative workflows." />
            </Helmet>

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
        </HelmetProvider>
    );
}

export default App;
