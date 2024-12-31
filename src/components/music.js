import React from "react";
import { Item, Title } from "./textConstants";
import fbs from "../images/album_fbs.jpg";
import jurassimo from "../images/album_jurassimo.jpg";
import mostly_angels from "../images/album_mostly_angels.jpg";
import swc from "../images/album_swc.jpg";

class Music extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="music" style={{ height: "100vh" }}>
        <section
          style={{
            backgroundColor: "black",
            height: "100vh",
            marginLeft: "0%",
            marginTop: "0%",
            backgroundSize: "100%",
          }}
        >
          <Title>Music - Tensen Park</Title>

          <Item
            style={{
              fontSize: "0.8em",
              textAlign: "center",
              paddingLeft: "15%",
              paddingRight: "15%",
              color: "white",
            }}
          >
            <i>
              After silence, that which comes nearest to expressing the
              inexpressible is music. - Aldous Huxley
            </i>
          </Item>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "40px 10px" }}>
            <a href="https://tensenpark.bandcamp.com/album/jurassimo">
              <img src={jurassimo.src} alt="Album - Jurassimo" style={{ width: "150px", height: "150px" }} />
            </a>
            <a href="https://tensenpark.bandcamp.com/album/futurebeats">
              <img src={fbs.src} alt="Album - FBS" style={{ width: "150px", height: "150px" }} />
            </a>
            <a href="https://tensenpark.bandcamp.com/album/mostly-angels">
              <img src={mostly_angels.src} alt="Album - Mostly Angels" style={{ width: "150px", height: "150px" }} />
            </a>
            <a href="https://tensenpark.bandcamp.com/album/spring-walk-collection">
              <img src={swc.src} alt="Album - SWC" style={{ width: "150px", height: "150px" }} />
            </a>
          </div>

          <Item
            style={{
              fontSize: "0.7em",
              textAlign: "center",
              color: "white",
            }}
          >
            Listen to it{" "}
            <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=maU5dB7ZRSy00-uf5L6i2A">
              Spotify
            </a>{" "}
            or Soundcloud
            <a href="https://soundcloud.com/tensen-park"> Soundcloud</a> or on{" "}
            <a href="https://tensenpark.bandcamp.com/"> Bandcamp</a>
          </Item>
        </section>
      </div>
    );
  }
}
export default Music;
