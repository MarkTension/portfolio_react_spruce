import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import { Item, Title } from "./textConstants"
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
  
  // const [allPostsData, setAllPosts] = useState(null);
  // console.log(allPostsData)

  // useEffect(() => {
  //   sanityClient
  //     .fetch(
  //       `*[_type == "post"] | order(publishedAt desc) {
  //       title,
  //       publishedAt,
  //       slug,
  //       mainImage{
  //         asset->{
  //         _id,
  //         url
  //       }
  //     }
  //   }`
  //     )
  //     .then((data) => setAllPosts(data))
  //     .catch(console.error);
  // }, []);

  return (
    <div id="blog" style={{ marginTop: "4%", background: "white" }}>
      <Title>
        Blog posts
      </Title>

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