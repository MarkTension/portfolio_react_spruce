import React from "react";
import styled from 'styled-components'
import sculptgif1 from "../images/sculptgif.gif";
import sculptgif2 from "../images/SculptingInProgressGif2.gif";
import sculptIm from "../images/sculptingInProgressIm.png";

import {Item, Title} from "./textConstants";


const releaseStylesheet = {
  marginTop: "0%",
  paddingLeft: "3%",
  paddingRight: "3%",
  height: "100%",
  borderRadius: "10px",
};


const GenerativePortfolio = props => {
    return (
        <div id="generative" style = {{marginTop:"2%", paddingLeft:"5%",alignContent:"right"}} >
            <Title>
            Generative Projects
           </Title>  

           <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            RL sculpting x Onformative
            </Item>
            <img src={sculptgif1} style={{marginRight:"5%",width:"30vw",height:"30vw"}} className="label-logo" alt="logo"/>
            {/* <img src={sculptgif2} style={{marginRight:"5%",height:"60%"}} className="label-logo" alt="logo"/> */}
            <img src={sculptIm} style={{marginRight:"5%",height:"30vw"}} className="label-logo" alt="logo"/>


            <Flex
                id="team"
                flexWrap="wrap"
                width="100%"
                style={{ marginBottom: "0%", paddingBottom:"0px"}}
            >
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                  <ReleaseEntry title="Lance Hoot - Minor Mileage" image={minorMileage} albumCode="1759150103" albumLink="https://lancehoot.bandcamp.com/album/minor-mileage-rerelease" />
                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                  <ReleaseEntry title="Tensen Park - Spring Walk Collection" image={springwalkcollection} albumCode="95223350" albumLink="'https://open.spotify.com/album/2kkAIsp8sb5DvzggHGt4pl?si=AiscV7uLSlCIN9slzVXUkA'" />
                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                  <ReleaseEntry title="Lance Hoot - String Palooza" image={stringpaloozaImage} albumCode="1490171069" albumLink="https://lancehoot.bandcamp.com/album/string-palooza" />
                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                  <ReleaseEntry title="Lance Hoot - m4" image={m4} albumCode="766175831" albumLink="https://lancehoot.bandcamp.com/album/m4" />
                </Box>
            </Flex>


            <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            boids x fireflies
            </Item>
            <iframe
              width="50%"
              height="300"
              src={`https://www.youtube.com/embed/9g_t46Ghh0Q`}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen="false"
              title="Embedded youtube"
            />

            <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            boids
            </Item>
            <iframe
              width="50%"
              height="300"
              src={`https://www.youtube.com/embed/wzjWxK7ZEL4`}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen="false"
              title="Embedded youtube"
            />

            <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            physarum
            </Item>
            <iframe
              width="50%"
              height="300"
              src={`https://www.youtube.com/embed/v6t85BFSc1g`}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen="false"
              title="Embedded youtube"
            />
            <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            Cellular automata
            </Item>
            <iframe 
              width="50%" 
              height="300" 
              src="https://www.youtube.com/embed/cpSe79QKB4g?controls=0" 
              title="Embedded youtube" 
              frameborder="0" 
              allow="autoplay" 
              allowfullscreen="false" 
            />

        </div> 
        );
  };
  export default GenerativePortfolio