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

      <div className="App">
        <header className="App-header">
          <div
            id="home"
            style={{
              margin: '0 auto',
              padding: '0 1rem',
              maxWidth: '1200px',
              width: '100%',
              background: "black",
            }}
          >
            <div
              style={{
                minHeight: "100vh",
                background: "black",
                paddingTop: "0%",
                marginTop: "0%",
              }}
            >
              <Home slug={slug} />
            </div>
          </div>
        </header>
      </div>
    </HelmetProvider>
  );
}

export default App;
