import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet-async";
import posts from "../markdowns/index.json";
import { darcula as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function Code({ className, children }) {
    const language = className?.replace("lang-", "");
    return (
        <div className="codeBlock">
            <SyntaxHighlighter language={language?.toLowerCase()} style={codeStyle}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}


export default function OnePost({ slug }) {
    const [postContent, setPostContent] = useState("");
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [relatedTag, setRelatedTag] = useState("");
    useEffect(() => {
        if (slug) {
            const startTime = new Date();

            import(`../markdowns/${decodeURIComponent(slug)}.md`)
                .then((res) => {
                    setPostContent(res.default);
                    ReactGA.send({
                        hitType: "pageview",
                        page: `/blog/${slug}`,
                        title: posts.files.find(post => post.key === slug)?.title || slug
                    });
                })
                .catch((err) => console.log(err));

            const currentPost = posts.files.find(post => post.key === slug);
            if (currentPost) {
                const currentPostTags = currentPost.tags.slice(0, 3);
                const related = posts.files
                    .filter(post =>
                        post.key !== slug && // Don't include current post
                        post.tags.some(tag => currentPostTags.includes(tag))
                    )
                    .slice(0, 6); // Limit to 5 related posts
                console.log("tags", currentPostTags);
                setRelatedPosts(related);
                setRelatedTag(currentPostTags.map(tag => `[${tag}]`).join(", "));
            }

            return () => {
                const endTime = new Date();
                const timeSpent = (endTime - startTime) / 1000; // in seconds
                ReactGA.event({
                    category: "Blog",
                    action: "Time on Page",
                    label: slug,
                    value: Math.round(timeSpent),
                    params: {
                        post_title: posts.files.find(post => post.key === slug)?.title,
                        time_spent_seconds: Math.round(timeSpent)
                    }
                });
            };
        }
    }, [slug]);

    const handleHomeClick = () => {
        window.location.href = "/";
    };

    return (
        <>
            <div
                id="onepost"
                style={{
                    background: "black",
                    width: window.innerWidth < 500 ? "90vw" : "100%",
                    paddingBottom: "5em",
                    // paddingLeft: "10%",
                    position: "relative",
                }}
            >
                <Helmet>
                    {/* Get the post metadata from your index.json */}
                    {posts.files.find(post => post.key === slug) && (
                        <>
                            <title>{posts.files.find(post => post.key === slug).title} - Mark Tensen's Blog</title>
                            <meta
                                name="description"
                                content={posts.files.find(post => post.key === slug).slug}
                            />
                            <meta
                                property="og:title"
                                content={posts.files.find(post => post.key === slug).title}
                            />
                            <meta
                                property="og:description"
                                content={posts.files.find(post => post.key === slug).slug}
                            />
                            <link rel="canonical" href={`https://marktension.nl/blog/${slug}`} />
                        </>
                    )}
                </Helmet>
                <div
                    style={{
                        position: "fixed",
                        left: "0px",
                        paddingLeft: "20px",
                        paddingTop: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "black",
                        alignItems: "left",
                        alignContent: "left",
                        textAlign: "left",
                    }}
                >
                    <button
                        style={{
                            padding: "5px",
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "0.5em",
                            background: "black",
                            color: "white",
                            border: "1px solid white",
                        }}
                        onClick={handleHomeClick}
                    >
                        Home
                    </button>
                    {relatedPosts.length > 0 && (
                        <div style={{
                            width: '150px',
                            maxWidth: '110px',
                            right: '20px',
                            top: '20px',
                            display: window.innerWidth > 800 ? 'block' : 'none',
                        }}>
                            <h3 style={{ fontSize: '0.6em', color: 'white' }}>Related Posts</h3>
                            <h3 style={{ fontSize: '0.4em', color: 'grey' }}>{relatedTag}</h3>

                            {relatedPosts.map(post => (
                                <a
                                    key={post.key}
                                    href={`/blog/${post.key}`}
                                    style={{
                                        display: 'block',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.4em',
                                        marginBottom: '1em',
                                        textAlign: "left",
                                        zIndex: 1000,
                                    }}
                                >
                                    <span style={{ color: 'red' }}>-</span>{post.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <Markdown
                        style={{ maxWidth: "550px", textAlign: "left", margin: "3em", color: "white" }}
                        options={{
                            overrides: {
                                code: {
                                    component: Code,
                                },
                                p: {
                                    props: {
                                        className: "markdown-p",
                                        style: {
                                            fontSize: "0.6em",
                                        },
                                    },
                                },
                                h1: {
                                    props: {
                                        style: {
                                            fontSize: "1.5em",
                                            fontWeight: "300",
                                        },
                                    },
                                },
                                pre: {
                                    props: {
                                        style: {
                                            backgroundColor: "black",
                                            padding: "0.5em",
                                            borderRadius: "4px",
                                            fontSize: "0.5em",
                                        },
                                    },
                                },

                                ul: {
                                    props: {
                                        style: {
                                            fontSize: "0.5em",
                                        },
                                    },
                                },
                                h3: {
                                    props: {
                                        style: {
                                            fontSize: "0.8em",
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {postContent}
                    </Markdown>
                </div>

            </div>
        </>
    );
}
