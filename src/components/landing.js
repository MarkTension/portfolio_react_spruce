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

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    gap: 5px;
    flex-wrap: wrap;
  }
`;

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { titles: [], isMobile: false };
    }

    componentDidMount() {
        this.state.titles = posts.files.map((post) => {
            return post.title;
        });
        
        // Check if mobile
        this.setState({ isMobile: window.innerWidth <= 768 });
        
        // Add resize listener
        window.addEventListener('resize', this.handleResize);
        
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({ isMobile: window.innerWidth <= 768 });
    };

    render() {
        const { isMobile } = this.state;
        const imageSize = isMobile ? 115 : 230; // Half size for mobile
        
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
                <ImageContainer>
                    <Image src={ff0.src} alt="Logo" width={imageSize} height={imageSize} />
                    <Image src={ff1.src} alt="Logo" width={imageSize} height={imageSize} />
                    <Image src={nca.src} alt="Logo" width={imageSize} height={imageSize} />
                    <Image src={ff4.src} alt="Logo" width={imageSize} height={imageSize} />
                </ImageContainer>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "35%" }}>
                        <Name style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                            Mark Tensen
                        </Name>
                    </div>
                    <Item
                        style={{
                            width: "65%",
                            textAlign: "left",
                            marginLeft: "2em",
                            fontSize: "0.6em",
                            whiteSpace: "pre-line",
                        }}
                    >
                        On finding synergies in programming, music, AI, artificial life, and
                        design
                    </Item>
                </div>
                <div style={{ width: "100%" }}>
                    <Item
                        style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "0.6em",
                            whiteSpace: "pre-line",
                        }}
                    >
                        <a href="https://twitter.com/Mark_Tension">X</a>, <a href="https://www.instagram.com/tensen.park/">Instagram</a>, <a href="https://tensenpark.bandcamp.com/">Bandcamp</a>, <a href="/rss.xml" target="_blank" rel="noopener noreferrer">RSS</a>, <a href="/cv.pdf">CV</a>
                    </Item>
                </div>
            </div>
        );
    }
}
export default Landing;
