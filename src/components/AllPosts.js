import React from "react";
import { Link } from "react-router-dom";
import { Title } from "./textConstants"
import styled from 'styled-components'
import { Box, Flex } from "rebass";
import posts from '../markdowns/index.json';
import '../App.css';

const linkStyle = {
    fontSize: "0.8em",
    background: "black",
    alignText: "left",
    textDecoration: "none",
    color: "grey",
    // background: "white"
}


const Item = styled.h3`
    font-size: 0.7em;
    text-align: left;
    color: white ;
    font-weight:100;
`;

const TaggButton = styled.button`
    cursor: pointer;
    font-size: 0.4em;
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
        try {
            const module = await import(`../markdowns/${title}.md`);
            const response = await fetch(module.default);
            const text = await response.text();
            // now parse the text.
            let blogContent = text.split("</p>")[1].split(" ").slice(0, 30).join(" ")
            blogContent = blogContent.replace(/<[^>]*>?/gm, '');
            blogContent = blogContent.replace(/\[([^\]]+)\]\([^\)]+\)/gm, '$1');
            // remove hashtags
            blogContent = blogContent.replace(/#/g, '');
            return blogContent
        }
        catch (error) {
            const module = await import(`../markdowns/${title}.md`);
            const response = await fetch(module.default);
            const text = (await response.text()).split("</p>")[0];
            console.error('TEXT is: ', text);
            console.error('Error fetching markdown: ', error);
        }



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

            <div id="blog" style={{ marginTop: "10%", background: "black" }}>
                <div style={{ width: "80%", maxWidth: "900px", marginLeft: "5%" }}>
                    <Item style={{ marginTop: "5%" }}>
                        <i>It's important to get it into words, because otherwise you miss it - the brain is set up to hide the assumption</i> - David Bohm
                    </Item>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10%" }}>
                        <Item style={{ fontSize: "1.0em", whiteSpace: "nowrap", marginRight: "20px" }}><b>Filter topics</b></Item>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", flex: 1 }}>
                            {allTags.map((tagg, index) => (
                                <TaggButton 
                                    key={index}
                                    style={{ 
                                        color: this.state.tagFilter === tagg ? "darkred" : "white",
                                        marginRight: "1px",
                                        marginBottom: "1px"
                                    }} 
                                    onClick={() => this.handleTagChangeClick(tagg)}
                                >
                                    {tagg}
                                </TaggButton>
                            ))}
                            <TaggButton 
                                style={{ 
                                    color: this.state.tagFilter === null ? "orange" : "white",
                                    marginRight: "1px",
                                    marginBottom: "1px"
                                }} 
                                onClick={() => this.handleTagChangeClick(null)} 
                            >
                                All Posts
                            </TaggButton>
                        </div>
                    </div>

                    <Flex
                        id="itemsBlog"
                        flexWrap="wrap"
                        width="100%"
                        style={{ marginBottom: "0%", paddingBottom: "0px", justifyContent: "flex-start" }}
                    >
                        {posts.files.map((post, index) => (
                            (post['tags'].includes(this.state.tagFilter) || this.state.tagFilter == null) &&

                            <Box key={post.title} id={"itemsBlog" + index} p={[2]} m={[0]} width={[1, 1]} style={{ textAlign: "left", display: "flex", flexDirection: "row" }}>
                                <Link id={"link" + index} to={"/blog/" + post['title']} key={post} style={{...linkStyle, display: "flex", width: "100%"}}>
                                    <Item style={{ color: "grey", fontSize: "0.8em", width: "15%", marginRight: "2%" }}>
                                        {post['date']}
                                    </Item>
                                    <div style={{ width: "30%", marginRight: "2%", marginTop: "0.6em" }}>
                                        <div style={{ fontWeight: "bold", fontSize: "0.6em", color: "white", textAlign: "left" }}>{post['title']}</div>
                                        <Item style={{ color: "orange", fontSize: "0.6em", fontWeight: 'bold' }}>
                                            {post['tags'].map((tag, index) => (tag + (index < post['tags'].length - 1 ? ", " : "")))}
                                        </Item>
                                    </div>
                                    <div style={{ width: "46%" }}>
                                        <Item style={{ fontSize: "0.6em", color: "lightgrey" }}>
                                            {post.markdown} 
                                            <span style={{ color: "grey" }}> ... continue reading</span>

                                        </Item>
                                    </div>
                                </Link>
                            </Box>
                        ))}
                    </Flex>
                </div>
            </div >
        );
    }
}
export default AllPosts