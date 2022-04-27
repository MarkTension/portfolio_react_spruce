import React from "react";
import styled from 'styled-components'
import gardenImage2 from "../images/gardenArtist2.png";
import YoutubeEmbed from "./youtubeEmbed.js";

import {Item, Hoverr, HoverText, Text} from "./textConstants";
// import { Box, Flex, Image } from "rebass";
import {isBrowser} from 'react-device-detect';

// #FF8484;
const HoverLinks = styled.h3`
    position: absolute;
    font-style: italic;
    font-weight: 100;
    top: 10%;
    right: 5%;
    font-size: 1.5em;
    text-align: center;
    color: indianred;
    z-index: 100;

    transition: transform 100ms ease-in-out;
    &:hover {
      transform: scale(1.2);
      /* font-weight: 200; */
      /* text-decoration: underline; */
    }
`;


function ImageMobile() {

  if (isBrowser) {
    return <img src={gardenImage2} height="100%" style={{marginRight:"5%"}} className="label-logo" alt="logo"/>
  }
  else{
    return <img src={gardenImage2} width="100%"  className="label-logo" alt="logo"/>
  }
}


const Landing = props => {
    return (
        <div id="landing" style = {{marginTop:"2%",alignContent:"right"}} >

            <Hoverr>
            Mark Tension
            </Hoverr>
            
            {/* <HoverLinks style={{right:"12%",cursor:"pointer", color:"indianred"}}>
            <a href="https://www.instagram.com/sumakuschmark/"> Instagram </a>
            </HoverLinks>
            <HoverLinks style={{top:"18%",right:"8%",cursor:"pointer", color:"indianred"}}>
            <a href="mailto:tensen.mark@gmail.com">contact me</a>
            </HoverLinks>
             */}


            < ImageMobile />
            
            <Item style={{width:"90%",textAlign:"right",fontSize:"0.9em"}}>
             
                I'm combining Machine Learning, Music, and generative design.
              </Item>

              <Item style={{width:"90%",textAlign:"right",fontSize:"0.9em"}}>
              <a href="mailto:tensen.mark@gmail.com">Shoot me an email</a>.
              </Item>
            
            <Item style={{width:"90%",textAlign:"right",fontSize:"0.9em"}}>
              For my music, please visit <a href="https://gardenwalkrecords.nl">Garden Walk Record's website</a>
              Or listen Tensen Park directly on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.
            </Item>

        </div> 

        
        );
  };
  export default Landing