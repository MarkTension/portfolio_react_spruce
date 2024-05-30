import React from "react";
import styled from 'styled-components'
import ff0 from "../images/firefliesPoster.webp";
import ff1 from "../images/fireflies1.webp";
import ff4 from "../images/fireflies2.webp";
import { Item } from "./textConstants";
import media from "../media";
import posts from '../markdowns/index.json';

const Hoverr = styled.h3`
    position: absolute;
    padding-left: 20%;
    top: 35%;
    right: 7%;
    font-size: 4.8em;
    text-align: center;
    color: darkred;
    z-index: 100;
    ${media.small`
        font-size: 1.8em;
        top: 10%;;
    `};
`;
class Landing extends React.Component {
    constructor(props) {
        super(props);
        // add a state var that is called this.state.titles
        this.state = { titles: [] }
    }

    // put all titles in the state
    componentDidMount() {
        this.state.titles = posts.files.map((post) => {
            // return <Item key={post.title} style={{ width: "90%", textAlign: "right", fontSize: "0.9em" }}>{post.title}</Item>
            return post.title
        }
        );
        this.forceUpdate();
    }


    render(
    ) {
        return (
            <div id="landing" style={{ marginTop: "0%", alignContent: "right", width: "100%", height: "100vh" }} >
                <Hoverr> Mark Tensen</Hoverr>

                <div style={{ height: "80vh" }}>
                    <img src={ff0} alt="Logo" width={"23%"} />;
                    <img src={ff1} alt="Logo" width={"23%"} />;
                    <img src={ff4} alt="Logo" width={"23%"} />;
                </div>
                {/* <Item style={{ width: "90%", top: "45%", right: "20%", fontSize: "0.9em", position: "absolute" }}>

                    {this.state.titles.map((title) => {
                        console.log(title)
                        return <Item>{title}</Item>
                    })}

                </Item > */}



                <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", whiteSpace: "pre-line" }}>
                    on finding synergies between programming, music, AI, artificial life, and design
                </Item>
                <Item style={{ width: "90%", textAlign: "right", fontSize: "0.9em", marginBottom: "10%" }}>
                    <a href="https://twitter.com/Mark_Tension">I share work in progress on twitter</a>, and music on <a href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=Z8aIfkyyT4qpf1HxKi2TdA&dl_branch=1">Spotify</a>.
                </Item>
            </div >
        );
    }
};
export default Landing