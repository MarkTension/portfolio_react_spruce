import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom";
import AllPosts from './allposts.js';
import OnePost from './onepost.js';
import { isBrowser } from 'react-device-detect';

const Blog = props => {

    return (
        // say hello in console

        <div id="blogHome" style={{ alignContent: "left", marginTop: isBrowser ? "2%" : "19%" }}>
            <Route component={AllPosts} path="/" exact />
            <Route component={OnePost} path={"/blog/:slug"} />
        </div>
    );
};
export default Blog