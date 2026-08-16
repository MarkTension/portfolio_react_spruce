import React from "react";
import { Item } from "./textConstants";
import posts from "../markdowns/index.json";

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            isMobile: typeof window !== "undefined" && window.innerWidth <= 768,
        };
        this.videoRefs = [React.createRef(), React.createRef(), React.createRef()];
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

        // iOS Safari sometimes ignores the autoPlay attribute, so trigger play() manually
        this.videoRefs.forEach((ref) => {
            if (ref.current) {
                const playPromise = ref.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
            }
        });
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
                        ref={this.videoRefs[0]}
                        src="/images/grid.webm"
                        width={imageSize}
                        height={imageSize}
                        style={{ objectFit: "cover", filter: "grayscale(1)", opacity: 0.6 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <video
                        ref={this.videoRefs[1]}
                        src="/images/steric.webm"
                        width={imageSize}
                        height={imageSize}
                        style={{ objectFit: "cover", filter: "grayscale(1)", opacity: 0.6 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    {!isMobile && (
                        <video
                            ref={this.videoRefs[2]}
                            src="/images/swimming.webm"
                            width={imageSize}
                            height={imageSize}
                            style={{ objectFit: "cover", filter: "grayscale(1)", opacity: 0.6 }}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    )}
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
                            width: "fit-content",
                            margin: "0 auto",
                            textAlign: "left",
                            fontSize: "0.72em",
                            whiteSpace: "pre-line",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0.4em",
                        }}
                    >
                        {[
                            { href: "/about", label: "About me" },
                            { href: "https://www.instagram.com/tensen.park/", label: "Instagram" },
                            { href: "https://tensenpark.bandcamp.com/", label: "Bandcamp" },
                            { href: "https://www.linkedin.com/in/mark-tensen/", label: "Linkedin" },
                            { href: "https://twitter.com/Mark_Tension", label: "X/twitter" },
                        ].map((link, i) => (
                            <a key={link.href} href={link.href} style={{ marginLeft: `${i * 2.2}em` }}>
                                {link.label}
                            </a>
                        ))}
                    </Item>
                </div>
            </div>
        );
    }
}
export default Landing;
