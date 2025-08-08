import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Helmet } from "react-helmet-async";
import { useRouter } from 'next/navigation';
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

export default function AboutPage() {
    const router = useRouter();
    const [content, setContent] = useState("");

    useEffect(() => {
        import(`../markdowns/about_me.md`)
            .then((res) => {
                setContent(res.default);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <>
            <div
                id="aboutpage"
                style={{
                    background: "black",
                    width: window.innerWidth < 500 ? "90vw" : "100%",
                    paddingBottom: "5em",
                    position: "relative",
                    minHeight: "100vh",
                }}
            >
                <Helmet>
                    <title>About Mark Tensen - Software Engineer & Digital Artist</title>
                    <meta
                        name="description"
                        content="Mark Tensen is a software engineer and digital artist exploring the intersection of technology, generative systems, and creative expression."
                    />
                    <meta
                        property="og:title"
                        content="About Mark Tensen - Software Engineer & Digital Artist"
                    />
                    <meta
                        property="og:description"
                        content="Exploring generative art, artificial life, electronic music production, and graphics programming."
                    />
                    <link rel="canonical" href="https://marktension.nl/about" />
                </Helmet>

                <div style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    zIndex: 1000,
                    display: window.innerWidth > 800 ? 'block' : 'none',
                }}>
                    <button
                        style={{
                            padding: "10px 15px",
                            backgroundColor: "black",
                            border: "1px solid white",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "0.6em",
                            color: "white",
                        }}
                        onClick={handleHomeClick}
                    >
                        ← Home
                    </button>
                </div>
                
                <div style={{ flex: 1 }}>
                    <Markdown
                        style={{ maxWidth: "650px", textAlign: "left", margin: "3em auto", color: "white", padding: "0 2em" }}
                        options={{
                            overrides: {
                                code: {
                                    component: Code,
                                },
                                p: {
                                    props: {
                                        className: "markdown-p",
                                        style: {
                                            fontSize: "0.7em",
                                            lineHeight: "1.6",
                                            marginBottom: "1.2em",
                                        },
                                    },
                                },
                                h1: {
                                    props: {
                                        style: {
                                            fontSize: "2.2em",
                                            fontWeight: "300",
                                            marginBottom: "0.8em",
                                            borderBottom: "1px solid #333",
                                            paddingBottom: "0.3em",
                                        },
                                    },
                                },
                                h2: {
                                    props: {
                                        style: {
                                            fontSize: "1.4em",
                                            fontWeight: "300",
                                            marginTop: "2em",
                                            marginBottom: "0.8em",
                                            color: "#ccc",
                                        },
                                    },
                                },
                                h3: {
                                    props: {
                                        style: {
                                            fontSize: "1.0em",
                                            fontWeight: "400",
                                            marginTop: "1.5em",
                                            marginBottom: "0.5em",
                                            color: "#ddd",
                                        },
                                    },
                                },
                                ul: {
                                    props: {
                                        style: {
                                            fontSize: "0.7em",
                                            lineHeight: "1.6",
                                            marginBottom: "1.2em",
                                        },
                                    },
                                },
                                strong: {
                                    props: {
                                        style: {
                                            color: "white",
                                            fontWeight: "500",
                                        },
                                    },
                                },
                                em: {
                                    props: {
                                        style: {
                                            color: "#aaa",
                                            fontStyle: "italic",
                                        },
                                    },
                                },
                                hr: {
                                    props: {
                                        style: {
                                            border: "none",
                                            borderTop: "1px solid #333",
                                            margin: "2em 0",
                                        },
                                    },
                                },
                            },
                        }}
                    >
                        {content}
                    </Markdown>
                </div>
            </div>
        </>
    );
}
