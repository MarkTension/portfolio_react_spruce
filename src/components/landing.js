import React from "react";
import styled from 'styled-components'
import phaseGraph from "../images/landing_phasegraph.webp";
import genVideo from "../images/fireflies.webm";
import firefliesPoster from "../images/firefliesPoster.webp";
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

// const Title = styled.h3`

//     position: "relative";
//     font-size: 4.8em;
//     text-align: center;
//     color: #fa2b00;
//     z-index: 100;
//     ${media.small`
//         font-size: 1.8em;
//         top: 40%;;
//     `};
// `;

const Landing = props => {
  return (
    <div id="landing" style={{ marginTop: "0%", alignContent: "right" }} >
    {/* {isBrowser ? <Hoverr> Mark Tension</Hoverr> : <Title>Mark Tension</Title>} */}
    <Hoverr> Mark Tension</Hoverr>

    <video loop muted poster={firefliesPoster} autoPlay width="80%" style={{ marginTop: "10%", objectFit: "contain" }} > 
    {/* loop muted poster={phaseGraph}   */}
            <source src={genVideo} type='video/webm' />
            {/* <source src={clip} type="video/ogg" />  */}
    </video>

      {/* < ImageMobile /> */}
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", whiteSpace: "pre-line" }}>
      On finding synergies between AI, artificial life, and generative design 
      </Item>
      <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em" , marginBottom: "10%"}}>
        <a href="https://twitter.com/Mark_Tension">I share work in progress on twitter</a>, and music on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.

      </Item>

 
    </div>


  );
};
export default Landing