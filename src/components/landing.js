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
        // `row` is the vertical step for each link: negative is up, positive is down
        this.links = [
            { href: "/about", label: "About me", row: -1 },
            { href: "https://www.instagram.com/tensen.park/", label: "Instagram", row: 0 },
            { href: "https://tensenpark.bandcamp.com/", label: "Bandcamp", row: -1 },
            { href: "https://www.linkedin.com/in/mark-tensen/", label: "Linkedin", row: 0 },
            { href: "https://twitter.com/Mark_Tension", label: "X/twitter", row: -1 },
        ];
        this.linkRefs = this.links.map(() => React.createRef());
        // proximity of the cursor to each link, 0 (far) .. 1 (right on it)
        this.state.linkProximity = this.links.map(() => 0);
    }

    // Mac-dock style magnification: each link swells, and warms towards the
    // "Mark Tensen" orange, based on how close the cursor is to its center.
    handleLinkAreaMove = (e) => {
        if (this.state.isMobile) return;
        const sigma = 30; // falloff radius in px
        const x = e.clientX;
        const y = e.clientY;
        const linkProximity = this.linkRefs.map((ref) => {
            if (!ref.current) return 0;
            const r = ref.current.getBoundingClientRect();
            const dx = x - (r.left + r.width / 2);
            const dy = y - (r.top + r.height / 2);
            const d2 = dx * dx + dy * dy;
            return Math.exp(-d2 / (2 * sigma * sigma));
        });
        this.setState({ linkProximity });
    };

    handleLinkAreaLeave = () => {
        this.setState({ linkProximity: this.links.map(() => 0) });
    };

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
                        On finding synergies in artificial life, ML, music, and
                        visual arts. Researcher at the Artificial Life Institute & Motorica.
                    </Item>
                </div>
                <div
                    style={{ width: "100%", marginTop: "1em", padding: "2.5em 0 2em" }}
                    onMouseMove={this.handleLinkAreaMove}
                    onMouseLeave={this.handleLinkAreaLeave}
                >
                    <Item
                        style={{
                            width: "fit-content",
                            margin: "0 auto",
                            textAlign: "left",
                            fontSize: isMobile ? "1.4em" : "0.9em",
                            whiteSpace: "pre-line",
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            flexWrap: isMobile ? "nowrap" : "wrap",
                            justifyContent: "center",
                            alignItems: isMobile ? "flex-start" : "center",
                            gap: isMobile ? "0.5em" : "0.0em",
                        }}
                    >
                        {this.links.map((link, i) => {
                            const t = this.state.linkProximity[i];
                            // red -> the "Mark Tensen" orange, by proximity
                            const mix = (from, to) => Math.round(from + (to - from) * t);
                            return (
                            <a
                                key={link.href}
                                href={link.href}
                                ref={this.linkRefs[i]}
                                style={{
                                    position: "relative",
                                    // desktop: wiggle across three rows (see `row` in this.links)
                                    // mobile: step diagonally from top-left to bottom-right
                                    top: isMobile ? 0 : `${link.row * 1.4}em`,
                                    marginLeft: isMobile
                                        ? `${i * 1.5}em`
                                        : i === 0 ? 0 : "-0.6em",
                                    display: "inline-block",
                                    fontFamily: '"Brier", "Inconsolata", sans-serif',
                                    fontWeight: 200,
                                    textDecoration: "none",
                                    transformOrigin: "center center",
                                    transform: `scale(${1 + 0.3 * t})`,
                                    color: `rgb(${mix(214, 255)}, ${mix(54, 165)}, ${mix(54, 0)})`,
                                    // the magnified link paints above its overlapping neighbours
                                    zIndex: Math.round(100 + t * 100),
                                    transition: "transform 90ms ease-out, color 90ms ease-out",
                                    willChange: "transform, color",
                                }}
                            >
                                {link.label}
                            </a>
                            );
                        })}
                    </Item>
                </div>
            </div>
        );
    }
}
export default Landing;
