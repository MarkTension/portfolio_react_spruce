import React from "react";
import styled from 'styled-components'
import ff0 from "../images/firefliesPoster.webp";
import ff1 from "../images/fireflies1.webp";
import ff4 from "../images/fireflies2.webp";
import { Item } from "./textConstants";
import media from "../media";
import posts from '../markdowns/index.json';
import { isBrowser } from 'react-device-detect';

const Name = styled.h3`
    font-size: 1.8em;
    color: darkred;
    text-align: left;

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
            return post.title
        }
        );
        this.forceUpdate();
    }


    render(
    ) {
        return (
            <div id="landing" style={{ marginLeft: "8%", marginTop: "0%", alignContent: "left", width: "100%" }} >
                <div style={{ position: "relative", display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <img src={ff0} alt="Logo" width={"23%"} />
                    <img src={ff1} alt="Logo" width={"23%"} />
                    <img src={ff4} alt="Logo" width={"23%"} />
                    <Name style={{
                        position: "absolute",
                        top: "40%",
                        left: "15%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        padding: "10px",
                        borderRadius: "5px",
                    }}>
                        Mark Tensen
                    </Name>
                </div>

                <Item style={{ width: "90%", textAlign: "left", fontSize: isBrowser ? "0.7em" : "1.3em", whiteSpace: "pre-line" }}>
                    on finding synergies between programming, music, AI, artificial life, and design
                    <p> </p>
                    Sharing WIP on <a href="https://twitter.com/Mark_Tension">X</a>, visuals on <a href="https://www.instagram.com/tensen.park/">instagram</a>, and music on <a href="https://tensenpark.bandcamp.com/">Bandcamp</a>.
                </Item>
            </div>
        );
    }
};
export default Landing