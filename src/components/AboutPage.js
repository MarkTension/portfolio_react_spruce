import React, { useEffect, useState } from "react";
import PostLayout from "./PostLayout";
import { sendPageView } from "../utils/analytics";

export default function AboutPage() {
    const [content, setContent] = useState("");

    useEffect(() => {
        import(`../markdowns/about_me.md`)
            .then((res) => {
                setContent(res.default);
                sendPageView("/about", "About - Mark Tensen");
            })
            .catch((err) => console.log(err));
    }, []);

    // same layout as a blog post, minus the related-posts block
    return <PostLayout id="aboutpage" content={content} />;
}
