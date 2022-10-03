import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { Title } from "./textConstants"
import styled from 'styled-components'
import { Box, Flex } from "rebass";
import posts from '../markdowns/index.json';
import SidebarBack from "./sidebarBack";


const postStyle = {
  alignContent: "left",
  marginTop: "3%",
  marginLeft:"5%",
  background: "white",
  height: "100%",
};


const linkStyle = {
  fontSize: "2em",
  background: "white",
  alignText: "left",
  textDecoration: "none"
}

const boxStyle = {
  alignContent: "right"
}

const Item = styled.h3`

    font-size: 0.6em;
    text-align: center;
    color: black ;
    font-weight:100;
`;

const SlugText = styled.h3`
    font-style: italic;
    font-weight: 100;
    font-size: 0.8em;
    color: #FF8484;
    background: white;
    text-decoration: none;
    // transition: transform 100ms ease-in-out;
    // &:hover {
    //   transform: scale(1.2);
    //   /* font-weight: 200; */
    //   /* text-decoration: underline; */
    // }
`;

console.log(posts.files)

export default function AllPosts() {
  

  return (
    <div id="blog" style={{ marginTop: "4%", background: "white" }}>
      
      <Title>
        Blog posts
      </Title>

      <Item style={{ marginTop: "5%"}}>

      I like putting thought into words. Sometimes it's the final waving goodbye to a project, and often it helps pondering-up new ideas.
      </Item><Item >

      Also, it helps to second-check my thinking. This quote by David Bohm resonates quite well with this:
      </Item><Item >

      <i>It’s important to get it into words, because otherwise you miss it - the brain is set up to hide the assumption</i>
      </Item><Item >

      </Item><Item >
      Here I share my engineering blog mixed with creative projects, and personal reflections.
      </Item>

      {posts.files.map((post, index) => (
            <div style={postStyle}>

                <Link to={"/blog/" + post[0]} key={post} style={linkStyle}>

                    <Flex
                        id="team"
                        flexWrap="wrap"
                        width="100%"
                        style={{ marginBottom: "0%", paddingBottom: "0px" }}
                    >
                        <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={boxStyle}>
                            <img src={post[1]} width="50%" />
                        </Box>
                        
                        <Box p={[1]} m={[0]} width={[1, 1 / 2]} style={boxStyle}>
                            <Item style={{ color: "black", fontSize: "0.8em", alignText: "right" , textDecoration: "underline", textDecorationColor: "#FF8484"}} >{post[0]}</Item>
                            <Item style={{ color: "black", fontSize: "0.4em", fontStyle: 'italic', alignText: "right"}} >
                                {post[3]}
                            </Item>
                            <Item style={{ color: "black", fontSize: "0.3em", fontStyle: 'italic', alignText: "right" }} >
                                {post[2]}
                            </Item>
                        </Box>
                    </Flex>
                </Link>

                <div>

                </div>

            </div>
        ))}
        <SidebarBack />

    </div>
  );
}