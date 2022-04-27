import React from "react";
import sculptgif1 from "../images/sculptgif.gif";
import sculptIm from "../images/sculptingInProgressIm.png";
import { Box, Flex, Image } from "rebass";

import { Item, ItemSmall, Title } from "./textConstants";
import jsonData from './generativeProjects.json';
// import JSON;

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


const GenerativePortfolio = props => {

  console.log(jsonData)
  var itemOne = jsonData[0]

  getData => {

      // for(i=0; i < jsonData.length; i++){
      //     // loopData += `<li>${data[i].name}</li>`
      //     console.log(i)
      // }
      return <Item>helllo</Item>

    }
  }

  return (
    <div id="generative" style={{ marginTop: "2%", paddingLeft: "5%", alignContent: "right" }} >
      <Title>
        Generative Projects
      </Title>
      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
        {jsonData[0].title}
      </Item>
      {getData}
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


      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
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

      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
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

      <Item style={{ width: "90%", textAlign: "center", fontSize: "0.9em" }}>
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