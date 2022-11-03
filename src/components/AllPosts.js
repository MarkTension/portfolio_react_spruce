import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Title } from "./textConstants"
import styled from 'styled-components'
import { Box, Flex } from "rebass";
import posts from '../markdowns/index.json';
import SidebarBack from "./sidebarBack";


const linkStyle = {
  fontSize: "1.5em",
  background: "white",
  alignText: "left",
  textDecoration: "none"
}


const Item = styled.h3`

    font-size: 0.6em;
    text-align: center;
    color: black ;
    font-weight:100;
`;

const TaggButton = styled.button`


`


class AllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.handleTagChangeClick = this.handleTagChangeClick.bind(this);
    this.state = { isTagged: false, tagFilter: null };
  }

  handleTagChangeClick(taggValue) {
    this.setState({ isTagged: true, tagFilter: taggValue });
  }

  render() {

    console.log(posts.files)

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    var allTags = []
    posts.files.map((post, index) => (
      allTags.push(post['tags'])
    ))
    allTags = allTags.flat(1)
    allTags = allTags.filter(onlyUnique);

    return (

      <div id="blog" style={{ marginTop: "4%", background: "white" }}>

        <Title>
          Blog posts
        </Title>

        <Item style={{ marginTop: "5%" }}>
          I like putting thought into words. Sometimes its the final waving goodbye to a project, and often it helps pondering-up new ideas.
        </Item><Item >

          Also, it helps to second-check my thinking. This quote by David Bohm resonates quite well with this:
        </Item><Item >

          <i>It’s important to get it into words, because otherwise you miss it - the brain is set up to hide the assumption</i>
        </Item><Item >

        </Item><Item >
          Here I share my engineering blog mixed with creative projects, and personal reflections.
        </Item>

        <Item><b>filter topics</b></Item>

        {allTags.map((tagg, index) => (
          <TaggButton style={{color:this.state.tagFilter == tagg ? "red" : "black"}} onClick={() => this.handleTagChangeClick(tagg)}>{tagg}</TaggButton>
        ))}
        <div></div>
        <TaggButton style={{color:this.state.tagFilter == null ? "red" : "black"}} onClick={() => this.handleTagChangeClick(null)} >All Posts</TaggButton>

        {posts.files.map((post, index) => (<Item></Item>))}

        <Flex
          id="itemsBlog"
          flexWrap="wrap"
          width="100%"
          style={{ marginBottom: "0%", paddingBottom: "0px" }}
        >

          {posts.files.map((post, index) => (
            (post['tags'].includes(this.state.tagFilter) || this.state.tagFilter == null) &&

            <Box id={"itemsBlog" + index} p={[2]} m={[0]} width={[1, 1 / 2]}>
                  <Link id={"link" + index} to={"/blog/" + post['title']} key={post} style={linkStyle}>
                    <img src={post['image']} width="50%" />
                    <Item style={{ color: "black", fontSize: "0.8em", alignText: "right", textDecoration: "underline", textDecorationColor: "#FF8484" }} >{post['title']}</Item>
                    <Item style={{ color: "black", fontSize: "0.4em", fontStyle: 'italic', alignText: "right" }} >
                      {post['date']}
                    </Item>
                    <Item style={{ color: "black", fontSize: "0.3em", fontStyle: 'italic', alignText: "right" }} >
                      {post['slug']}
                    </Item>
                    <Item style={{ color: "black", fontSize: "0.4em", fontWeight: 'bold', alignText: "right" }} >
                      {post['tags'].map((post, index) => (post + ", "))}
                    </Item>
                  </Link>
            </Box>
          ))}
        </Flex>
        <SidebarBack />

      </div>
    );
  }
}
export default AllPosts