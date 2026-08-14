import React from "react";
import { Item } from "./textConstants";
import posts from "../markdowns/index.json";

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
                    width: "100%",
                    padding: "0 1rem",
                    boxSizing: "border-box",
                }}
            >
                <div className="image-container">
                    <video
                        src="/images/grid.webm"
                        width={imageSize}
                        height={imageSize}
                        style={{ objectFit: "cover" }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <video
                        src="/images/steric.webm"
                        width={imageSize}
                        height={imageSize}
                        style={{ objectFit: "cover" }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <video
                        src="/images/swimming.webm"
                        width={imageSize}
                        height={imageSize}
                        style={{ objectFit: "cover" }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "100%", marginTop: "2em" }}>
                    <div style={{ width: "35%", minWidth: "0", flexShrink: 0 }}>
                        <h3 className="name" style={{ cursor: "pointer" }} onClick={() => window.location.href = "/"}>
                            Mark Tensen
                        </h3>
                    </div>
                    <Item
                        style={{
                            width: "65%",
                            textAlign: "left",
                            marginLeft: "2em",
                            fontSize: "0.6em",
                            whiteSpace: "pre-line",
                            minWidth: "0",
                            wordWrap: "break-word",
                        }}
                    >
                        On finding synergies in programming, music, AI, artificial life, and
                        design. Researcher at the Artificial Life Institute & Motorica.
                    </Item>
                </div>
                <div style={{ width: "100%", marginTop: "1em" }}>
                    <Item
                        style={{
                            width: "100%",
                            textAlign: "center",
                            fontSize: "0.6em",
                            whiteSpace: "pre-line",
                        }}
                    >
                        <a href="/about" style={{ color: "orange" }}>About me</a>, <a href="https://twitter.com/Mark_Tension">X</a>, <a href="https://www.instagram.com/tensen.park/">Instagram</a>, <a href="https://tensenpark.bandcamp.com/">Bandcamp</a>, <a href="https://www.linkedin.com/in/mark-tensen/">Linkedin</a>, <a href="/cv.pdf">CV</a>
                    </Item>
                </div>
            </div>
        );
    }
}
export default Landing;
