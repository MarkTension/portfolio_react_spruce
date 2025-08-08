import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Helmet } from "react-helmet-async";
import { useRouter } from 'next/navigation';
import { getAboutPageMarkdownOptions } from "../utils/markdownConfig";

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
                        options={getAboutPageMarkdownOptions()}
                    >
                        {content}
                    </Markdown>
                </div>
            </div>
        </>
    );
}
