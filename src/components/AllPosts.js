import React, { useState, useEffect } from "react";
import { Box, Flex } from "rebass";
import Link from "next/link";
import indexData from "../markdowns/index.json";
import styled from "styled-components";

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

const YearHeader = styled.h2`
    font-size: 1.2em;
    color: #ccc;
    margin: 40px 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #333;
    font-weight: 300;
    width: 100%;
`;

const AllPosts = () => {
    let posts = indexData.files;
    const [tagFilter, setTagFilter] = useState(null);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [allMarkdowns, setAllMarkdowns] = useState([]);
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

    // Group posts by year and sort by year (high to low)
    const groupPostsByYear = (posts) => {
        const grouped = {};
        posts.forEach(post => {
            const year = post.date.split('-')[0]; // Extract year from date string
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(post);
        });
        
        // Sort years in descending order and return as array of [year, posts] pairs
        return Object.entries(grouped).sort((a, b) => b[0] - a[0]);
    };

    const postsByYear = groupPostsByYear(filteredPosts);

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
                    maxWidth: "100%",
                    overflow: "hidden",
                }}
            >

                <div
                    style={{ display: "flex", alignItems: "center", marginTop: "60px" }}
                >
                    <Item
                        style={{
                            fontSize: "1.0em",
                            whiteSpace: "nowrap",
                            marginRight: "20px",
                            marginBottom: "60px",
                        }}
                    >
                        <b>Topics</b>
                    </Item>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            flex: 1,
                            maxWidth: "100%",
                            overflow: "hidden",
                        }}
                    >
                        {allTags.map((tagg, index) => (
                            <TaggButton
                                key={index}
                                style={{
                                    color: tagFilter === tagg ? "red" : "white",
                                    marginRight: "1px",
                                    marginBottom: "1px",
                                }}
                                onClick={() => handleTagChangeClick(tagg)}
                            >
                                {tagg}
                            </TaggButton>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
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
                <Item style={{ marginTop: "5%", color: "lightgrey", fontSize: "0.5em" }}>
                    <i>
                        It's important to get it into words, because otherwise you miss it -
                        the brain is set up to hide the assumption
                    </i>{" "}
                    - David Bohm
                </Item>
                <Item style={{ marginTop: "5%", color: "lightgrey", fontSize: "0.5em" }}>
                        The purpose of this blog is to have a public repository for my ideas, notes and reflections.
                        A set of markdown files that I can publish and keep track of.
                        It's a "Memex"; a living document and archive of where one has been, and a tool that advises where one could go <a href="https://wiki.xxiivv.com/site/about.html">*</a>.
                </Item>

                <br />

                {postsByYear.map(([year, yearPosts]) => (
                    <React.Fragment key={year}>
                        <YearHeader>{year}</YearHeader>
                        {yearPosts.map((post, index) => (
                            <Box
                                key={post.title}
                                id={"itemsBlog" + index}
                                p={[2]}
                                m={[0]}
                                width={[1, 1]}
                                style={{ textAlign: "left", display: "flex", flexDirection: "row", maxWidth: "100%", overflow: "hidden" }}
                            >
                                <Link
                                    onMouseEnter={() => {
                                        setHoveredImage(post.img);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredImage(null);
                                    }}
                                    href={`/blog/${post.key}`}
                                    style={{ ...linkStyle, display: "flex", width: "100%", maxWidth: "100%", overflow: "hidden" }}
                                >
                                    {/* <Item
                                        style={{
                                            color: "grey",
                                            fontSize: "0.6em",
                                            width: "15%",
                                            marginRight: "2%",
                                        }}
                                    >
                                        {post["date"]}
                                    </Item> */}
                                    <div
                                        style={{ width: "50%", marginRight: "2%", marginTop: "0.6em", minWidth: "0", flexShrink: 0 }}
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
                                    <div style={{ width: "46%", minWidth: "0", overflow: "hidden" }}>
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
                    </React.Fragment>
                ))}
            </Flex>
        </div>
    );
};

export default AllPosts;
