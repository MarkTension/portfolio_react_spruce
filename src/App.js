import React from "react";
import "./App.css";
import Home from "./components/home.js";
import ReactGA from "react-ga4";
ReactGA.initialize("G-33GQEY07L1");

function App({ slug }) {
  return (
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
  );
}

export default App;
