import React, { useEffect, useState } from "react";
import { Title } from "./textConstants"
import Markdown from "markdown-to-jsx";
import SidebarBack from "./sidebarBack";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { isBrowser } from 'react-device-detect';

export default function OnePost() {
    const { slug } = useParams();
    const [postContent, setPostContent] = useState("");

    useEffect(() => {
        import("../markdowns/".concat(slug, ".md"))
            .then(res => {
                fetch(res.default)
                    .then(response => response.text())
                    .then(response => setPostContent(response))
                    .catch(err => console.log(err))
            })
    }, [])

    return (<div id="onepost" style={{ background: "black", width: isBrowser ? "80vw" : "100vw", maxWidth: "1200px", paddingBottom: '5em', paddingTop: '2em' }}>

        <Title style={{ fontSize: "1.5em", color: "white", background: "black" }}>
            {slug}
        </Title>

        <Markdown
            style={{ textAlign: "left", margin: isBrowser ? "5em" : "2em", color: "white" }}
            options={{
                overrides: {
                    p: {
                        props: {
                            className: 'markdown-p',
                        },
                    },
                    pre: {
                        props: {
                            style: {
                                backgroundColor: "grey",
                                padding: '0.5em',
                                borderRadius: '4px',
                                fontSize: '0.5em',
                            },
                        },
                    },
                    code: {
                        props: {
                            style: {
                                fontFamily: 'monospace',
                                fontSize: '0.9em',
                            },
                        },
                    },
                },
            }}
        >
            {postContent}
        </Markdown>
        <SidebarBack />
    </div>
    );
}
