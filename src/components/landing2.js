import React from "react";
import styled from 'styled-components'

import { Item } from "./textConstants";

//width: "100%", textAlign: "right", fontSize: "0.9em", ,  whiteSpace: "pre-line" 
const Landing2 = props => {
  return (
    <div id="landing2" style={{ alignContent: "right", background: "black", height: "100vh" }} > //marginTop: "0%",

      <Item style={{ marginTop: "15%"}}>

        I like putting my thought into words. Sometimes it's the final waving goodbye to a  project, and often it helps pondering-up new ideas.
        </Item><Item >

        Also, it helps to second-check my thinking. This quote by David Bohm resonates quite well with this:
        </Item><Item >

        <i>It’s important to get it into words, because otherwise you miss it - the brain is set up to hide the assumption</i>
        </Item><Item >

      </Item><Item >
        Here I share my engineering blog mixed with creative projects, and personal reflections.
      </Item>

    </div>


  );
};
export default Landing2