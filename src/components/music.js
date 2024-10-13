import React from "react";
import { Item, Title } from "./textConstants";

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
              fontSize: "0.9em",
              textAlign: "left",
              margin: "5%",
              color: "white",
            }}
          >
            I love this quote by Aldous Huxley:
          </Item>

          <Item
            style={{
              fontSize: "0.9em",
              textAlign: "left",
              paddingLeft: "15%",
              paddingRight: "15%",
              color: "red",
            }}
          >
            <i>
              After silence, that which comes nearest to expressing the
              inexpressible is music.
            </i>
          </Item>

          <Item
            style={{
              fontSize: "0.9em",
              textAlign: "left",
              margin: "5%",
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
