import React from "react";
import { Item, Title } from "./textConstants"
// import SidebarBack from "./sidebarBack";
import { Route } from "react-router-dom/cjs/react-router-dom";
// import posts from '../markdowns/index.json';
import AllPosts from './allposts.js';
import OnePost from './onepost.js';
import { isBrowser } from 'react-device-detect';


// console.log(posts.files)

const Blog = props => {
    
    return (
    <div id="blogHome" style={{ alignContent: "left", marginTop: isBrowser ? "2%" : "19%" }}>    
        <Route component={AllPosts} path="/blog" exact />
        <Route component={OnePost} path={"/blog/:slug"} />
    </div>
    );
};
export default Blog