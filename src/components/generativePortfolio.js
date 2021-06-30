import React from "react";
import styled from 'styled-components'
import YoutubeEmbed from "./youtubeEmbed.js";

import {Item, Title} from "./textConstants";



const GenerativePortfolio = props => {
    return (
        <div id="generative" style = {{marginTop:"2%",alignContent:"right"}} >
            <Title>
            Generative Projects
           </Title>  
            
            <Item style={{width:"90%",textAlign:"center",fontSize:"0.9em"}}>
            physarum
            </Item>
            {/* <YoutubeEmbed style={{width:"20%"}} embedId="v6t85BFSc1g"/> */}

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