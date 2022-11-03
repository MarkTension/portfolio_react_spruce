import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Title } from "./textConstants"
import Markdown from "markdown-to-jsx";
import SidebarBack from "./sidebarBack";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { isBrowser } from 'react-device-detect';

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
}
