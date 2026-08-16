import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { useRouter } from 'next/navigation';
import posts from "../markdowns/index.json";
import { getMarkdownOptions } from "../utils/markdownConfig";
import { sendPageView, sendEvent } from "../utils/analytics";

export default function OnePost({ slug }) {
    const router = useRouter();
    const [postContent, setPostContent] = useState("");
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [relatedTag, setRelatedTag] = useState("");
    useEffect(() => {
        if (slug) {
            const startTime = new Date();
            
            // Find the post by slug instead of key
            const currentPost = posts.files.find(post => post.slug === slug);
            
            if (currentPost) {
                // Use the key (with number prefix) to load the markdown file
                import(`../markdowns/${currentPost.key}.md`)
                    .then((res) => {
                        setPostContent(res.default);
                        sendPageView(`/blog/${slug}`, currentPost.title);
                    })
                    .catch((err) => console.log(err));

                const currentPostTags = currentPost.tags.slice(0, 3);
                const related = posts.files
                    .filter(post =>
                        post.slug !== slug && // Don't include current post (compare by slug)
                        post.tags.some(tag => currentPostTags.includes(tag))
                    )
                    .slice(0, 6); // Limit to 6 related posts
                console.log("tags", currentPostTags);
                setRelatedPosts(related);
                setRelatedTag(currentPostTags.map(tag => `[${tag}]`).join(", "));
            }

            return () => {
                const endTime = new Date();
                const timeSpent = (endTime - startTime) / 1000; // in seconds
                sendEvent(
                    "Blog",
                    "Time on Page",
                    slug,
                    Math.round(timeSpent),
                    {
                        post_title: currentPost?.title,
                        time_spent_seconds: Math.round(timeSpent)
                    }
                );
            };
        }
    }, [slug]);

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <>
            <div
                id="onepost"
                style={{
                    background: "black",
                    width: typeof window !== 'undefined' && window.innerWidth < 500 ? "90vw" : "100%",
                    paddingBottom: "5em",
                    position: "relative",
                }}
            >
                {/* Header inside scrollable content, minimal style */}
                <div
                    style={{
                        background: 'black',
                        padding: '10px 18px 10px 18px',
                        borderBottomRightRadius: '12px',
                        cursor: 'pointer',
                        fontFamily: '"Brier", "Inconsolata", sans-serif',
                        fontSize: '1.1em',
                        color: 'orange',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        width: 'fit-content',
                        marginTop: 0,
                        marginLeft: 0,
                    }}
                    onClick={handleHomeClick}
                >
                    Mark Tensen
                </div>
                <div style={{ flex: 1 }}>
                    <Markdown
                        style={{ maxWidth: "550px", textAlign: "left", margin: "3em", color: "white" }}
                        options={getMarkdownOptions()}
                    >
                        {postContent}
                    </Markdown>
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <div style={{
                    position: 'fixed',
                    width: '150px',
                    maxWidth: '110px',
                    right: '20px',
                    top: '20px',
                    display: typeof window !== 'undefined' && window.innerWidth > 800 ? 'block' : 'none',
                    zIndex: 1000,
                    background: 'black',
                    padding: '10px',
                    border: '1px solid #333',
                    borderRadius: '4px',
                }}>
                    <h3 style={{ fontSize: '0.6em', color: 'white', margin: '0 0 10px 0' }}>Related Posts</h3>
                    <h3 style={{ fontSize: '0.4em', color: 'grey', margin: '0 0 10px 0' }}>{relatedTag}</h3>

                    {relatedPosts.map(post => (
                        <a
                            key={post.key}
                            href={`/blog/${post.slug}`}
                            style={{
                                display: 'block',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '0.4em',
                                marginBottom: '1em',
                                textAlign: "left",
                            }}
                        >
                            <span style={{ color: 'red' }}>-</span>{post.title}
                        </a>
                    ))}
                    {/* Home button now inside the related posts box */}
                    <button
                        style={{
                            padding: "5px",
                            backgroundColor: "black",
                            border: "1px solid white",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "0.5em",
                            color: "white",
                            marginTop: "10px",
                            width: "100%",
                        }}
                        onClick={handleHomeClick}
                    >
                        Home
                    </button>
                </div>
            )}
        </>
    );
}
