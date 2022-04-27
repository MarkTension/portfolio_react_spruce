import React from "react";
import styled from 'styled-components'
import phaseGraph from "../images/landing_phasegraph.PNG";

import { Item, Text } from "./textConstants";
// import { Box, Flex, Image } from "rebass";
import { isBrowser } from 'react-device-detect';
import media from "../media";



function ImageMobile() {

  if (isBrowser) {
    return <img src={phaseGraph} width="60%" style={{ marginRight: "5%", objectFit: "contain" }} className="label-logo" alt="logo" />
  }
  else {
    return <img src={phaseGraph} width="60%" style={{ marginRight: "5%", objectFit: "contain" }} className="label-logo" alt="logo" />
  }
}
const Hoverr = styled.h3`
    position: absolute;
    padding-left: 10%;
    top: 6%;
    right: 7%;
    font-size: 3.8em;
    text-align: left;
    color: #fa2b00;
    z-index: 100;
    ${media.small`
        font-size: 1.8em;
        top: 40%;;
    `};
`;

const Landing = props => {
  return (
    <div id="landing" style={{ marginTop: "2%", alignContent: "right" }} >

      <Hoverr>
        Mark Tension, finding synergy between ML, realtime graphics, and generative design 
      </Hoverr>

      {/* <HoverLinks style={{right:"12%",cursor:"pointer", color:"indianred"}}>
            <a href="https://www.instagram.com/sumakuschmark/"> Instagram </a>
            </HoverLinks>
            <HoverLinks style={{top:"18%",right:"8%",cursor:"pointer", color:"indianred"}}>
            <a href="mailto:tensen.mark@gmail.com">contact me</a>
            </HoverLinks>
             */}


      < ImageMobile />

      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em" }}>

        Datascientist by day, combining Machine Learning, Music, and generative design by night.
      </Item>
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em" }}>
        <a href="https://twitter.com/Mark_Tension">I share things on twitter</a>, and music on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.

      </Item>

      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em" }}>
      </Item>
    </div>


  );
};
export default Landing