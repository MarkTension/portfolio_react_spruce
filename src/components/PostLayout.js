import React from "react";
import Markdown from "markdown-to-jsx";
import { useRouter } from 'next/navigation';
import { getMarkdownOptions } from "../utils/markdownConfig";

/**
 * Shared layout for a markdown page: "Mark Tensen" header aligned with the left
 * edge of the post title, an optional related-posts block on the right half of
 * the viewport, and the centered markdown column.
 */
export default function PostLayout({ id = "onepost", content, relatedPosts = [], relatedTag = "" }) {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <div
            id={id}
            style={{
                background: "black",
                width: typeof window !== 'undefined' && window.innerWidth < 500 ? "90vw" : "100%",
                maxWidth: "100%",
                minWidth: 0,
                paddingBottom: "5em",
                position: "relative",
            }}
        >
            {/* Header inside scrollable content, minimal style.
                Related posts sit on the same line, pushed to the right.
                The row stays inside the centered column so it can act as the
                positioning context for the related-posts block. */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 0',
                    marginTop: 0,
                }}
            >
                {/* the 3em matches the markdown block's margin below, so the name
                    starts on the same vertical line as the post title */}
                <div style={{ marginLeft: '3em' }}>
                    <div
                        style={{
                            background: 'black',
                            cursor: 'pointer',
                            fontFamily: '"Brier", "Inconsolata", sans-serif',
                            fontSize: '1.1em',
                            color: 'orange',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                        }}
                        onClick={handleHomeClick}
                    >
                        Mark Tensen
                    </div>
                </div>

                {relatedPosts.length > 0 && (
                    // two stacked rows, hugging the right edge; both rows share the same left start.
                    // absolutely placed so it still starts at the middle of the viewport and runs to
                    // 50px from its right edge, independent of the name's width
                    <div style={{
                        display: typeof window !== 'undefined' && window.innerWidth > 800 ? 'flex' : 'none',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        // 100% here is the centered column's width, so both edges
                        // resolve back to viewport coordinates
                        left: 'calc(50vw - (100vw - 100%) / 2)',
                        right: 'calc(50px - (100vw - 100%) / 2)',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        rowGap: '0.2em',
                        minWidth: 0,
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8em', whiteSpace: 'nowrap' }}>
                            <h3 style={{ fontSize: '0.6em', color: 'white', margin: 0 }}>Related Posts</h3>
                            <h3 style={{ fontSize: '0.4em', color: 'grey', margin: 0 }}>{relatedTag}</h3>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6em', whiteSpace: 'nowrap' }}>
                            {relatedPosts.slice(0, 3).map(post => (
                                <a
                                    key={post.key}
                                    href={`/blog/${post.slug}`}
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.4em',
                                        textAlign: "left",
                                        flexShrink: 0,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <span style={{ color: 'var(--red)' }}>-</span>{post.title}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div style={{ flex: 1 }}>
                <Markdown
                    style={{
                        maxWidth: "750px",
                        minWidth: 0,
                        textAlign: "left",
                        margin: "3em",
                        color: "white",
                        hyphens: "auto",
                        textWrap: "pretty",
                    }}
                    options={getMarkdownOptions()}
                >
                    {content}
                </Markdown>
            </div>
        </div>
    );
}
