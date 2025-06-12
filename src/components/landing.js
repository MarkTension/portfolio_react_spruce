import React from "react";
import styled from "styled-components";
import Image from "next/image";
import ff0 from "../images/firefliesPoster.webp";
import ff1 from "../images/fireflies1.webp";
import ff4 from "../images/fireflies2.webp";
import nca from "../images/nca_swarming.webp";
import { Item } from "./textConstants";
import posts from "../markdowns/index.json";

const Name = styled.h3`
  font-size: 1.2em;
  color: orange;
  text-align: right;
  align-self: center; /* Aligns the Name vertically centered */
`;

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { titles: [] };
    }

    componentDidMount() {
        this.state.titles = posts.files.map((post) => {
            return post.title;
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div
                id="landing"
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "0%",
                    alignContent: "center",
                    maxWidth: "800px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <Image src={ff0.src} alt="Logo" width={230} height={230} />
                    <Image src={ff1.src} alt="Logo" width={230} height={230} />
                    <Image src={nca.src} alt="Logo" width={230} height={230} />
                    <Image src={ff4.src} alt="Logo" width={230} height={230} />
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "35%" }}>
                        <Name style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                            Mark Tensen
                        </Name>
                    </div>
                    <Item
                        style={{
                            width: "100%",
                            textAlign: "left",
                            marginLeft: "2em",
                            fontSize: "0.6em",
                            whiteSpace: "pre-line",
                        }}
                    >
                        On finding synergies in programming, music, AI, artificial life, and
                        design
                        <p> </p>
                        Sharing WIP on <a href="https://twitter.com/Mark_Tension">X</a>,
                        visuals on{" "}
                        <a href="https://www.instagram.com/tensen.park/">instagram</a>, and
                        music on <a href="https://tensenpark.bandcamp.com/">Bandcamp</a>. Or check my <a href="/cv.pdf">CV</a>
                    </Item>
                </div>
            </div>
        );
    }
}
export default Landing;
