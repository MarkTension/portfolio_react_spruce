import React, { useEffect, useState } from "react";
// import sanityClient from "../client.js";
// import BlockContent from "@sanity/block-content-to-react";
// import imageUrlBuilder from "@sanity/image-url";
import styled from "styled-components";

import { Item, Title } from "./textConstants"
import Markdown from "markdown-to-jsx";
import SidebarBack from "./sidebarBack";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { isBrowser } from 'react-device-detect';



const blogTextStyle = {
  fontFamily: 'Helvetica',
  textAlign: "justify",
  fontSize: "0.7em",
  fontWeight: "200",
  marginLeft: "5%",
  marginRight: "10%",
}

const Button = styled.button`
  font-style: italic;
  font-weight: 100;
  font-size: 1.2em;
  border-radius: 10px;
  border-color: white;
  text-decoration-color: red;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  color: #ff8484;
  background: white;
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.2);
    /* font-weight: 200; */
    /* text-decoration: underline; */
  }
`;


export default function OnePost() {
  const { slug } = useParams();
  console.log(slug)
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    import("../markdowns/".concat(slug, ".md"))
      .then(res => {
        fetch(res.default)
          .then(response => response.text())
          .then(response => setPostContent(response))
          .catch(err => console.log(err))
      })
  }, [])

  return (<div id="onepost" style={{ background: "white", width: isBrowser ? "80vw" : "100vw", paddingBottom: '5em', paddingTop: '2em' }}>

    <Title style={{fontSize:"1.5em", background:"white"}}>
      {slug}
    </Title>


    <Markdown

      style={{ textAlign: "left", margin: isBrowser ? "5em" : "2em" }}
    >
      {postContent}
    </Markdown>

    <SidebarBack />
  </div>
  );









  // const [postData, setPostData] = useState(null);
  // const { slug } = useParams();
  // const history = useHistory();

  // function handleClick() {
  //   history.push("/");
  // }

  // useEffect(() => {
  //   sanityClient
  //     .fetch(
  //       `*[slug.current == $slug]{
  //         title,
  //         slug,
  //         mainImage{
  //           asset->{
  //             _id,
  //             url
  //            }
  //          },
  //        body,
  //       "name": author->name,
  //       "authorImage": author->image
  //      }`,
  //       { slug }
  //     )
  //     .then((data) => setPostData(data[0]))
  //     .catch(console.error);
  // }, [slug]);

  // if (!postData) return <div>Loading...</div>;

  // return (
  //   <div style={{"width": "80%","marginLeft" : "5%", "marginRight" : "5%"}}>
  //     <div > 
  //       <Button type="button" onClick={handleClick}>
  //         Go Back
  //       </Button>
  //       <SlugText>{postData.title}</SlugText>
  //       <div>
  //         <h4 > {postData.name}</h4>
  //       </div>
  //     </div>
  //     <img src={urlFor(postData.mainImage).width(400).url()} alt="" />
  //     <div style={blogTextStyle}> 
  //       <BlockContent width="80%"
  //         blocks={postData.body}
  //         imageOptions={{w: 800, h: 400, fit: 'max'}}
  //         projectId={sanityClient.clientConfig.projectId}
  //         dataset={sanityClient.clientConfig.dataset}
  //       />
  //     </div>
  //   </div>
  // );
}
