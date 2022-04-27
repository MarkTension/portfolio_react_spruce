import React from "react";
import sculptgif1 from "../images/sculptgif.gif";
import sculptIm from "../images/sculptingInProgressIm.png";
import { Box, Flex, Image } from "rebass";

import { Item, ItemSmall, Title } from "./textConstants";
import jsonData from './generativeProjects.json';


const releaseStylesheet = {
    marginTop: "0%",
    paddingLeft: "3%",
    paddingRight: "3%",
    // height: "100%",
    borderRadius: "10px",
  };
  const imageStylesheet = {
    marginTop: "0%",
    paddingLeft: "3%",
    paddingRight: "3%",
    borderRadius: "10px",
  };


const GenerativeItem = props => {

    return (
      <div id="generative" style={{ marginTop: "2%", paddingLeft: "5%", alignContent: "right" }} >
        
        
        <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
          {props.title}
        </Item>
  
        <Flex
          id="team"
          flexWrap="wrap"
          width="100%"
          style={{ marginBottom: "0%", paddingBottom: "0px" }}
        >
          <Image src={require("../images/" + jsonData[0].image1).default} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />
          <Image src={require("../images/" + jsonData[0].image1).default} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />
  
          <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
            <ItemSmall>
              <b>description:</b> + {jsonData[0].description1}
            </ItemSmall>
            <ItemSmall>
              {jsonData[0].description2}
            </ItemSmall>
            <ItemSmall>
              {jsonData[0].description3}
            </ItemSmall>
          </Box>
          <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
          </Box>
        </Flex>
  
      </div>
    );
  };
  export default GenerativeItem