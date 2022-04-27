import React from "react";
import sculptgif1 from "../images/sculptgif.gif";
import sculptIm from "../images/sculptingInProgressIm.png";
import { Box, Flex } from "rebass";

import {Item, Title} from "./textConstants";
// import jsonData from './generativeProjects.json';


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

                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                </Box>
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
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