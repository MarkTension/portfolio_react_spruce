import React from "react";
import styled from 'styled-components'
import genVideo from "../images/fireflies.webm";
import firefliesPoster from "../images/firefliesPoster.webp";
import { Item } from "./textConstants";
import media from "../media";

const Hoverr = styled.h3`
    position: absolute;
    padding-left: 20%;
    top: 20%;
    right: 7%;
    font-size: 4.8em;
    text-align: center;
    color: darkred;
    z-index: 100;
    ${media.small`
        font-size: 1.8em;
        top: 10%;;
    `};
`;

const Landing = props => {
  return (
    <div id="landing" style={{ marginTop: "0%", alignContent: "right" }} >
      <Hoverr> Mark Tension</Hoverr>

      <video loop muted poster={firefliesPoster} autoPlay width="80%" style={{ marginTop: "10%", objectFit: "contain" }} >
        <source src={genVideo} type='video/webm' />
      </video>
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", whiteSpace: "pre-line" }}>
        On finding synergies between AI, artificial life, and generative design
      </Item>
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", marginBottom: "10%" }}>
        <a href="https://twitter.com/Mark_Tension">I share work in progress on twitter</a>, and music on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.
      </Item>
    </div>
  );
};
export default Landing