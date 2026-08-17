import React from "react";
import "../App.css";
import Blog from "./blog";
import Landing from "./landing.js";
import Music from "./music.js";

function Home({ slug }) {
  // about renders through Blog now, in the same column as a blog post
  const isViewingBlogPost = slug && slug !== "blog";

  return (
    <div className="App">
      {!isViewingBlogPost && <Landing style={{ background: "black", marginTop: "0%", }} />}
      <div
        id="home"
        style={{
          margin: "0 auto",
          maxWidth: "650px",
          padding: "0%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Blog slug={slug} />
      </div>
      {!isViewingBlogPost && <Music />}
    </div>
  );
}

export default Home;
