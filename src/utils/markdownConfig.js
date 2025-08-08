import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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

export const getMarkdownOptions = () => ({
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
            component: ({ children, ...props }) => (
                <ul 
                    {...props} 
                    style={{ 
                        fontSize: "0.5em",
                        ...props.style 
                    }}
                >
                    <style>{`
                        ul ul {
                            font-size: 1.0em !important;
                        }
                    `}</style>
                    {children}
                </ul>
            ),
        },
        h3: {
            props: {
                style: {
                    fontSize: "0.8em",
                },
            },
        },
    },
});

export const getAboutPageMarkdownOptions = () => ({
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
});
