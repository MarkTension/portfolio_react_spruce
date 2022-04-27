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


            <Title style={{ width: "100%", textAlign: "right", fontSize: "2em" }}>
                {props.content.title}
            </Title>

            <Flex
                id="team"
                flexWrap="wrap"
                width="100%"
                style={{ marginBottom: "0%", paddingBottom: "0px" }}
            >
                <Image src={require("../images/" + props.content.image1).default} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />
                <Image src={require("../images/" + props.content.image1).default} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />

                <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                    <ItemSmall>
                        <b>description:</b> + {props.content.description1}
                    </ItemSmall>
                    <ItemSmall>
                        {props.content.description2}
                    </ItemSmall>
                    <ItemSmall>
                        {props.content.description3}
                    </ItemSmall>
                </Box>
                <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                    <ItemSmall>
                        <b>technology: </b>{props.content.tech}
                    </ItemSmall>
                    <ItemSmall>
                    <b>credits: </b>{props.content.credits}
                    </ItemSmall>
                </Box>
            </Flex>

        </div>
    );
};
export default GenerativeItem