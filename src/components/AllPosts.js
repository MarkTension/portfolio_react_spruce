import React from "react";
import { Link } from "react-router-dom";
import { Title } from "./textConstants"
import styled from 'styled-components'
import { Box, Flex } from "rebass";
import posts from '../markdowns/index.json';
import SidebarBack from "./sidebarBack";
import '../App.css';

const linkStyle = {
    fontSize: "1.2em",
    background: "black",
    alignText: "left",
    textDecoration: "none",
    color: "grey",
    // background: "white"
}


const Item = styled.h3`

    font-size: 0.9em;
    text-align: center;
    color: white ;
    font-weight:100;
`;

const TaggButton = styled.button`
    cursor: pointer;
    font-size: 0.65em;
    background: black;
    color: white;
    padding: 0.25em 1em;
    margin:0.2em;
    border: 1px solid white;
    border-radius: 3px;
    font-color: white
    size: 2em;
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

    fetchMarkdownSlugs = async (title) => {
        const module = await import(`../markdowns/${title}.md`);
        const response = await fetch(module.default);
        const text = await response.text();
        // now parse the text.
        let blogContent = text.split("</p>")[1].split(" ").slice(1, 50).join(" ")
        blogContent = blogContent.replace(/<[^>]*>?/gm, '');
        blogContent = blogContent.replace(/\[([^\]]+)\]\([^\)]+\)/gm, '$1');
        // remove hashtags
        blogContent = blogContent.replace(/#/g, '');
        return blogContent

    };

    async componentDidMount() {
        // for each post, fetch the markdown content
        for (const post of posts.files) {
            const markdown = await this.fetchMarkdownSlugs(post.title);
            post.markdown = markdown;
        }
        this.forceUpdate();
        this.state.tagFilter = null
    }

    render() {

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

            <div id="blog" style={{ marginTop: "4%", background: "black" }}>

                <Title>
                    Blog posts
                </Title>
                <div style={{ width: "80%", margin: "auto" }}>

                    <Item style={{ marginTop: "5%" }}>
                        <p>
                            I like putting my engineering thoughts and general reflections into words.
                            Sometimes its the final waving goodbye to a project, and often it helps coming-up with new ideas.
                        </p>
                        <p>
                            Also, it helps to second-check my thinking. This quote by David Bohm resonates quite well with this:
                        </p>
                        <u><i>It’s important to get it into words, because otherwise you miss it - the brain is set up to hide the assumption</i></u>

                    </Item>
                    <Item style={{ fontSize: "1.2em" }}><b>filter topics</b></Item>

                    <center>
                        <div style={{ width: "60%" }} >
                            {allTags.map((tagg, index) => (
                                <TaggButton style={{ color: this.state.tagFilter == tagg ? "red" : "white" }} onClick={() => this.handleTagChangeClick(tagg)}>{tagg}</TaggButton>
                            ))}
                            <div></div>
                            <TaggButton style={{ color: this.state.tagFilter == null ? "red" : "white" }} onClick={() => this.handleTagChangeClick(null)} >All Posts</TaggButton>
                        </div>
                    </center>
                    {posts.files.map((post, index) => (<Item></Item>))}

                    <Flex
                        id="itemsBlog"
                        flexWrap="wrap"
                        width="100%"
                        style={{ marginBottom: "0%", paddingBottom: "0px" }}
                    >

                        {posts.files.map((post, index) => (
                            (post['tags'].includes(this.state.tagFilter) || this.state.tagFilter == null) &&

                            <Box id={"itemsBlog" + index} p={[2]} m={[0]} width={[1, 1]}>
                                <Link id={"link" + index} to={"/blog/" + post['title']} key={post} style={linkStyle}>
                                    <img src={post['image']} width="25%" />
                                    <Item />
                                    {/* <Item style={{ color: "red", background: "white", fontSize: "0.8em", alignText: "right", textDecoration: "underline", textDecorationColor: "#FF8484" }} >{post['title']}</Item> */}
                                    {post['title']}
                                    <Item style={{ color: "white", fontSize: "0.8em", alignText: "right" }} >
                                        {post['date']}
                                    </Item>
                                    <Item style={{ color: "white", fontSize: "0.4em", fontWeight: 'bold', alignText: "right" }} >
                                        {post['tags'].map((post, index) => (post + ", "))}
                                    </Item>
                                    <Item style={{ fontSize: "0.6em" }}>
                                        {post.markdown}

                                    </Item>
                                    <Item style={{ color: "red", fontSize: "0.6em" }}>
                                        ... continue reading
                                    </Item>
                                </Link>
                                <hr style={{ color: "darkgrey", width: "70%", }} />
                            </Box>
                        ))}
                    </Flex>
                </div>
                <SidebarBack />
            </div >
        );
    }
}
export default AllPosts