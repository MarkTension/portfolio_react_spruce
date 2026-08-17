import React from "react";
import AllPosts from "./allposts.js";
import OnePost from "./onepost.js";
import AboutPage from "./AboutPage.js";

const Blog = ({ slug }) => {
  return (
    <div
      id="blogHome"
      style={{
        alignContent: "left",
        marginTop: "0%",
        // flex item: without these, wide content (long code lines, iframes) pushes
        // the column past the 650px container and posts end up different widths
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
      }}
    >
      {slug === "about" ? (
        <AboutPage />
      ) : slug === "blog" || !slug ? (
        <AllPosts />
      ) : (
        <OnePost slug={slug} />
      )}
    </div>
  );
};

export default Blog;