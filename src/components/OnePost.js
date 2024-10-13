import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import ReactGA from "react-ga4";

export default function OnePost({ slug }) {
  const [postContent, setPostContent] = useState("");
  useEffect(() => {
    if (slug) {
      import(`../markdowns/${decodeURIComponent(slug)}.md`)
        .then((res) => {
          setPostContent(res.default);
        })
        .catch((err) => console.log(err));
    }
  }, [slug]);

  const handleHomeClick = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    if (slug) {
      const startTime = new Date();

      import(`../markdowns/${decodeURIComponent(slug)}.md`)
        .then((res) => {
          setPostContent(res.default);
          ReactGA.send({ hitType: "pageview", page: `/blog/${slug}` });
        })
        .catch((err) => console.log(err));

      return () => {
        const endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000; // in seconds
        ReactGA.event({
          category: "Blog",
          action: "Time on Page",
          label: slug,
          value: Math.round(timeSpent),
        });
      };
    }
  }, [slug]);

  return (
    <div
      id="onepost"
      style={{
        background: "black",
        width: "100%",
        maxWidth: "1200px",
        paddingBottom: "5em",
        paddingTop: "2em",
        position: "relative",
      }}
    >
      <button
        onClick={handleHomeClick}
        style={{
          position: "fixed",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          padding: "10px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          background: "black",
          color: "white",
        }}
      >
        Home
      </button>
      <Markdown
        style={{ textAlign: "left", margin: "3em", color: "white" }}
        options={{
          overrides: {
            p: {
              props: {
                className: "markdown-p",
              },
            },
            pre: {
              props: {
                style: {
                  backgroundColor: "grey",
                  padding: "0.5em",
                  borderRadius: "4px",
                  fontSize: "0.5em",
                },
              },
            },
            code: {
              props: {
                style: {
                  fontFamily: "monospace",
                  fontSize: "0.9em",
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
  );
}
