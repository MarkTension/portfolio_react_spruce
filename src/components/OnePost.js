import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import styled from "styled-components";

// className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">

const blogTextStyle = {
    fontFamily: 'Helvetica',
    textAlign:"justify",
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

const SlugText = styled.h3`
    font-style: italic;
    font-weight: 100;
    font-size: 1.2em;
    color: #FF8484;
    background: white;
    text-decoration: none;
    // transition: transform 100ms ease-in-out;
    // &:hover {
    //   transform: scale(1.2);
    //   /* font-weight: 200; */
    //   /* text-decoration: underline; */
    // }
`;

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function handleBack() {
  this.props.history.push("/");
}

export default function OnePost() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div>
      <div > 
        <Button type="button" onClick={handleClick}>
          Go Back
        </Button>
        <SlugText>{postData.title}</SlugText>
        <div>
          {/* <img
            src={urlFor(postData.authorImage).width(100).url()}
            alt="Author is Mark"
          /> */}
          <h4 > {postData.name}</h4>

        </div>
      </div>
      <img src={urlFor(postData.mainImage).width(400).url()} alt="" />
      <div style={blogTextStyle}> 
        <BlockContent width="80%"
          blocks={postData.body}
          imageOptions={{w: 800, h: 400, fit: 'max'}}
          projectId={sanityClient.clientConfig.projectId}
          dataset={sanityClient.clientConfig.dataset}
        />
      </div>
    </div>
  );
}
