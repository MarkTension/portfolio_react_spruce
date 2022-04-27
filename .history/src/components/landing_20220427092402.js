import React from "react";
import styled from 'styled-components'
import phaseGraph from "../images/landing_phasegraph.PNG";

import { Item } from "./textConstants";
// import { Box, Flex, Image } from "rebass";
import { isBrowser } from 'react-device-detect';
import media from "../media";



function ImageMobile() {

  if (isBrowser) {
    return <img src={phaseGraph} width="50%" style={{ marginRight: "5%", objectFit: "contain" }} className="label-logo" alt="logo" />
  }
  else {
    return <img src={phaseGraph} width="50%" style={{ marginRight: "5%", objectFit: "contain" }} className="label-logo" alt="logo" />
  }
}
const Hoverr = styled.h3`
    position: absolute;
    padding-left: 20%;
    top: 6%;
    right: 7%;
    font-size: 4.8em;
    text-align: left;
    color: #fa2b00;
    z-index: 100;
    ${media.small`
        font-size: 1.8em;
        top: 40%;;
    `};
`;
const Hoverr2 = styled.h3`
    position: absolute;
    padding-left: 15%;
    bottom: 5%;
    right: 7%;
    font-size: 2.8em;
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
    <div id="landing" style={{ marginTop: "0%", alignContent: "right" , background: "black"}} >

      <Hoverr>
        Mark Tension
      </Hoverr>
      <Hoverr2>
         
      </Hoverr2>   

      < ImageMobile />
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", whiteSpace: "pre-line" }}>
      On finding synergies between AI, artificial life, and generative design 
      </Item>
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em" }}>
        <a href="https://twitter.com/Mark_Tension">I share work in progress on twitter</a>, and music on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.

      </Item>

 
    </div>


  );
};
export default Landing