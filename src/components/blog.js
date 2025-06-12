import React from "react";
import AllPosts from "./allposts.js";
import OnePost from "./onepost.js";

const Blog = ({ slug }) => {
  return (
    <div id="blogHome" style={{ alignContent: "left", marginTop: "0%" }}>
      {slug === "blog" || !slug ? <AllPosts /> : <OnePost slug={slug} />}
    </div>
  );
};

export default Blog;