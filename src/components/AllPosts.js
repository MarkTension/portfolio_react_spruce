import React, { useState, useEffect } from "react";
import { Box, Flex } from "rebass";
import Link from "next/link";
import indexData from "../markdowns/index.json";
import styled from "styled-components";
import Gallery from "./gallery.js";

const linkStyle = {
    fontSize: "0.8em",
    background: "black",
    alignText: "left",
    textDecoration: "none",
    color: "grey",
    // background: "white"
};

const Item = styled.h3`
  font-size: 0.7em;
  text-align: left;
  color: white;
  font-weight: 100;
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
`;


const AllPosts = () => {
    let posts = indexData.files;
    const [tagFilter, setTagFilter] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [allMarkdowns, setAllMarkdowns] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredImage, setHoveredImage] = useState(false);

    useEffect(() => {
        const fetchAllMarkdowns = async () => {
            const markdowns = await Promise.all(
                posts.map((post) => fetchMarkdownSlugs(post.key)),
            );
            setAllMarkdowns(markdowns);
        };
        fetchAllMarkdowns();
    }, []);

    useEffect(() => {
        setFilteredPosts(
            posts.filter(
                (post) => post["tags"].includes(tagFilter) || tagFilter == null,
            ),
        );
    }, [tagFilter]);

    const handleTagChangeClick = (taggValue) => {
        setTagFilter(taggValue);
    };

    const fetchMarkdownSlugs = async (slug) => {
        try {
            let blogContent = await import(`../markdowns/${slug}.md`).then(
                (res) => res.default,
            );

            // Remove markdown H1 title if present
            if (blogContent.startsWith("# ")) {
                blogContent = blogContent.substring(blogContent.indexOf("\n") + 1);
            }

            if (blogContent.includes("<p>")) {
                blogContent = blogContent.split("</p>")[1]
            }
            blogContent = blogContent.split(" ").slice(0, 30).join(" ");
            blogContent = blogContent.replace(/<[^>]*>?/gm, "");
            blogContent = blogContent.replace(/\[([^\]]+)\]\([^\)]+\)/gm, "$1");
            blogContent = blogContent.replace(/#/g, "");
            return blogContent;

        } catch (error) {
            const text = await import(`../markdowns/${slug}.md`).then(
                (res) => res.default,
            );
            console.error(text);
            console.error("Error fetching markdown: ", error);
        }
    };

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    const allTags = posts.flatMap((post) => post["tags"]).filter(onlyUnique);

    return (
        <div>
            {hoveredImage && (
                <div style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20%',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }}>
                    <img
                        src={`/images/${hoveredImage}`}
                        alt=""
                        style={{
                            maxWidth: '300px',
                            maxHeight: '300px',
                            border: '1px solid white',
                            borderRadius: '4px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            )}

            <Flex
                id="itemsBlog"
                flexWrap="wrap"
                width="100%"
                style={{
                    marginBottom: "0%",
                    paddingBottom: "0px",
                    justifyContent: "flex-start",
                }}
            >
                <Item style={{ marginTop: "5%", color: "lightgrey", fontSize: "0.5em" }}>
                    <i>
                        It's important to get it into words, because otherwise you miss it -
                        the brain is set up to hide the assumption
                    </i>{" "}
                    - David Bohm
                </Item>

                <div
                    style={{ display: "flex", alignItems: "center", marginTop: "30%" }}
                >
                    <Item
                        style={{
                            fontSize: "1.0em",
                            whiteSpace: "nowrap",
                            marginRight: "20px",
                        }}
                    >
                        <b>Filter topics</b>
                    </Item>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        {allTags.map((tagg, index) => (
                            <TaggButton
                                key={index}
                                style={{
                                    color: tagFilter === tagg ? "darkred" : "white",
                                    marginRight: "1px",
                                    marginBottom: "1px",
                                }}
                                onClick={() => handleTagChangeClick(tagg)}
                            >
                                {tagg}
                            </TaggButton>
                        ))}
                        <TaggButton
                            style={{
                                color: tagFilter === null ? "orange" : "white",
                                marginRight: "1px",
                                marginBottom: "1px",
                            }}
                            onClick={() => handleTagChangeClick(null)}
                        >
                            All Posts
                        </TaggButton>
                    </div>
                </div>

                <br />


                {filteredPosts.map((post, index) => (
                    <Box
                        key={post.title}
                        id={"itemsBlog" + index}
                        p={[2]}
                        m={[0]}
                        width={[1, 1]}
                        style={{ textAlign: "left", display: "flex", flexDirection: "row" }}
                    >
                        <Link
                            onMouseEnter={() => {
                                setHoveredImage(post.img);
                            }}
                            onMouseLeave={() => {
                                setHoveredImage(null);
                            }}
                            href={`/blog/${post.key}`}
                            style={{ ...linkStyle, display: "flex", width: "100%" }}
                        >
                            <Item
                                style={{
                                    color: "grey",
                                    fontSize: "0.6em",
                                    width: "15%",
                                    marginRight: "2%",
                                }}
                            >
                                {post["date"]}
                            </Item>
                            <div
                                style={{ width: "30%", marginRight: "2%", marginTop: "0.6em" }}
                            >
                                <div
                                    style={{
                                        fontWeight: "",
                                        fontSize: "0.8em",
                                        color: "white",
                                        textAlign: "left",
                                        fontFamily: "Arial",
                                    }}
                                >
                                    {post["title"]}
                                </div>
                                <Item
                                    style={{
                                        color: "orange",
                                        fontSize: "0.6em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {post["tags"].map(
                                        (tag, index) =>
                                            tag + (index < post["tags"].length - 1 ? ", " : ""),
                                    )}
                                </Item>
                            </div>
                            <div style={{ width: "46%" }}>
                                <Item
                                    style={{
                                        fontSize: "0.6em",
                                        color: "lightgrey",
                                        fontFamily: "Arial",
                                    }}
                                >
                                    {allMarkdowns[posts.findIndex((p) => p.key === post.key)]}
                                    <span style={{ color: "grey" }}> ... continue reading</span>
                                </Item>
                            </div>
                        </Link>
                    </Box>
                ))}
            </Flex>
        </div>
    );
};

export default AllPosts;
