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
  return <div>{listItems}</div>;
}




const GenerativePortfolio = props => {

  return (
    <div id="generative" style={{ marginTop: "2%", paddingLeft: "5%", alignContent: "right" }} >
      <Title>
        Generative Projects
      </Title>

      <RenderGenProjects items={jsonData}/>

    </div>
  );
};
export default GenerativePortfolio