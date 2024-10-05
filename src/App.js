import React from "react";
import "./App.css";
import Home from "./components/home.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactGA from "react-ga4";
ReactGA.initialize("G-33GQEY07L1");

function App({ slug }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>
          Mark Tensen's Blog: Exploring Software Engineering, Artificial Life,
          Electronic Music, and generative AI
        </title>
        <meta
          name="description"
          content="Exploring the generative AI, Artificial Life, and electronic music production. 
                Reflections on generative, MaxMSP devices, and creative workflows."
        />
      </Helmet>

      <div className="App" style={{ background: "yellow" }}>
        <header className="App-header">
          <div
            id="home"
            style={{
              marginLeft: "15%",
              marginRight: "15%",
              padding: "0%",
              background: "black",
            }}
          >
            <div
              style={{
                height: "100vh",
                background: "black",
                paddingTop: "0%",
                marginTop: "0%",
              }}
            >
              <Home slug={slug} />
            </div>
            {/* // add the music component header */}
          </div>
        </header>
      </div>
    </HelmetProvider>
  );
}

export default App;
