import React from "react";
import { Box, Flex, Image } from "rebass";
import { ItemSmall, Title } from "./textConstants";


const releaseStylesheet = {
    marginTop: "0%",
    paddingLeft: "3%",
    paddingRight: "3%",
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
        <div id="generative" style={{ marginTop: "2%", paddingright: "2%", paddingLeft: "5%", alignContent: "right" }} >

            <Title style={{ fontSize: "2em" }}>
                {props.content.title}
            </Title>

            <Flex
                id="team"
                flexWrap="wrap"
                width="100%"
                style={{ marginBottom: "0%", paddingBottom: "0px" }}
            >
                <Image src={require("../images/" + props.content.image1)} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />
                <img src={require("../images/" + props.content.image1)} p={[0]} m={[0]} width={[1, 1 / 2]} style={imageStylesheet} />

                {typeof props.content.video1 != "undefined" &&
                    <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>

                        <iframe
                            width="100%"
                            height="300"
                            src={"https://www.youtube.com/embed/" + props.content.video1}
                            allow="autoplay"
                            title="Embedded youtube"
                        />
                    </Box>
                }
                {typeof props.content.video2 != "undefined" &&
                    <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>

                        <iframe
                            width="100%"
                            height="300"
                            src={"https://www.youtube.com/embed/" + props.content.video2}
                            allow="autoplay"
                            title="Embedded youtube"
                        />
                    </Box>
                }

                <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                    <ItemSmall>
                        <b>description:</b> {props.content.description1}
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