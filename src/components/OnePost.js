import React, { useEffect, useState } from "react";
import posts from "../markdowns/index.json";
import PostLayout from "./PostLayout";
import { sendPageView, sendEvent } from "../utils/analytics";

export default function OnePost({ slug }) {
    const [postContent, setPostContent] = useState("");
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [relatedTag, setRelatedTag] = useState("");
    useEffect(() => {
        if (slug) {
            const startTime = new Date();
            
            // Find the post by slug instead of key
            const currentPost = posts.files.find(post => post.slug === slug);
            
            if (currentPost) {
                // Use the key (with number prefix) to load the markdown file
                import(`../markdowns/${currentPost.key}.md`)
                    .then((res) => {
                        setPostContent(res.default);
                        sendPageView(`/blog/${slug}`, currentPost.title);
                    })
                    .catch((err) => console.log(err));

                const currentPostTags = currentPost.tags.slice(0, 3);
                const related = posts.files
                    .filter(post =>
                        post.slug !== slug && // Don't include current post (compare by slug)
                        post.tags.some(tag => currentPostTags.includes(tag))
                    )
                    .slice(0, 6); // Limit to 6 related posts
                console.log("tags", currentPostTags);
                setRelatedPosts(related);
                setRelatedTag(currentPostTags.map(tag => `[${tag}]`).join(", "));
            }

            return () => {
                const endTime = new Date();
                const timeSpent = (endTime - startTime) / 1000; // in seconds
                sendEvent(
                    "Blog",
                    "Time on Page",
                    slug,
                    Math.round(timeSpent),
                    {
                        post_title: currentPost?.title,
                        time_spent_seconds: Math.round(timeSpent)
                    }
                );
            };
        }
    }, [slug]);
    return (
        <PostLayout
            id="onepost"
            content={postContent}
            relatedPosts={relatedPosts}
            relatedTag={relatedTag}
        />
    );
}
