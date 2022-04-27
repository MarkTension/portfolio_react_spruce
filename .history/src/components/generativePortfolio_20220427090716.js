import React from "react";
import styled from 'styled-components'
import sculptgif1 from "../images/sculptgif.gif";
import sculptgif2 from "../images/SculptingInProgressGif2.gif";
import sculptIm from "../images/sculptingInProgressIm.png";

import {Item, Title} from "./textConstants";



const GenerativePortfolio = props => {
    return (
        <div id="generative" style = {{marginTop:"2%", paddingLeft:"15%",alignContent:"right"}} >
            <Title>
            Generative Projects
           </Title>  

           <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            RL sculpting x Onformative
            </Item>
            <img src={sculptgif1} style={{marginRight:"5%",width:"30vw",height:"30vw"}} className="label-logo" alt="logo"/>
            {/* <img src={sculptgif2} style={{marginRight:"5%",height:"60%"}} className="label-logo" alt="logo"/> */}
            <img src={sculptIm} style={{marginRight:"5%",height:"30vw"}} className="label-logo" alt="logo"/>



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