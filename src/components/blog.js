import React from "react";
import AllPosts from "./allposts.js";
import OnePost from "./onepost.js";

const Blog = ({ slug }) => {
  return (
    <div id="blogHome" style={{ alignContent: "left", marginTop: "10%" }}>
      {slug ? <OnePost slug={slug} /> : <AllPosts />}
    </div>
  );
};

export default Blog;
