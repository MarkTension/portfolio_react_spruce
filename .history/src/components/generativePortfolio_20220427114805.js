import React from "react";
import sculptgif1 from "../images/sculptgif.gif";
import sculptIm from "../images/sculptingInProgressIm.png";
import { Box, Flex, Image } from "rebass";

import { Item, ItemSmall, Title } from "./textConstants";
import jsonData from './generativeProjects.json';
import GenerativeItem from "./GenerativeItem";
// import JSON;


function RenderGenProjects(props) {
  const items = props.items
  const listItems = items.map((item) =>

    <div>
       <GenerativeItem content={item} />
    </div>
   
  );
  return <ul>{listItems}</ul>;
}




const GenerativePortfolio = props => {

  return (
    <div id="generative" style={{ marginTop: "2%", paddingLeft: "5%", alignContent: "right" }} >
      <Title>
        Generative Projects
      </Title>

      <RenderGenProjects items={jsonData}/>

      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
        boids x fireflies
      </Item>
      

      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
        boids
      </Item>
      <iframe
        width="50%"
        height="300"
        src={`https://www.youtube.com/embed/wzjWxK7ZEL4`}
        frameBorder="0"
        allow="autoplay"
        title="Embedded youtube"
      />

      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
        physarum
      </Item>
      <iframe
        width="50%"
        height="300"
        src={`https://www.youtube.com/embed/v6t85BFSc1g`}
        frameBorder="0"
        allow="autoplay"
        title="Embedded youtube"
      />
      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
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