import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import {Title} from "./textConstants"
import styled from 'styled-components'
import { Box, Flex } from "rebass";

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

const releaseStylesheet = {
    marginTop: "0%",
    paddingLeft: "3%",
    paddingRight: "3%",
    height: "100%",
    borderRadius: "10px",
  };


export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
        title,
        publishedAt,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);



  return (
    <div id="blog" style = {{marginTop:"4%", background:"white"}}>
      <Title>
            Blog posts
      </Title>
      <div>
        {allPostsData &&
          allPostsData.map((post, index) => (
            <Link to={"/" + post.slug.current} key={post.slug.current}>
                <Flex
                flexWrap="wrap"
                width="100%"
                style={{ marginBottom: "0%", paddingBottom:"0px"}}
            >
                <Box  p={[1]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                    <span key={index}>
                        <img src={post.mainImage.asset.url} alt="" width="50%"/>
                    </span>
                </Box>
                <Box  p={[2]} m={[0]} width={[1, 1 / 2]} style={releaseStylesheet}>
                    <h2 style={{color: 'black'}}>{post.title}</h2>
                    <h4 style={{color: 'black'}}>{post.publishedAt.substring(0,10)}</h4>

                    {/* <SlugText style={{color: 'black'}}>{post.publishedAt.substring(0, 10)}</SlugText> */}
                    <SlugText style={{color: 'black'}}>{post.slug.current}</SlugText>
                </Box>
            </Flex> 
            </Link>
          ))}
      </div>
    </div>
  );
}