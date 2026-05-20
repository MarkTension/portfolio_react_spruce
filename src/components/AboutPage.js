import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
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
                    width: typeof window !== 'undefined' && window.innerWidth < 500 ? "90vw" : "100%",
                    paddingBottom: "5em",
                    position: "relative",
                    minHeight: "100vh",
                }}
            >
                <div
                    style={{
                        background: 'black',
                        padding: '10px 18px 10px 18px',
                        borderBottomRightRadius: '12px',
                        cursor: 'pointer',
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
                <div style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    zIndex: 1000,
                    display: typeof window !== 'undefined' && window.innerWidth > 800 ? 'block' : 'none',
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
