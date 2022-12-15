import React from "react";
import { Nav } from "react-bootstrap";
import '../stylesheets/sidebar.css'
import styled from 'styled-components'
import animateScrollTo from "animated-scroll-to";
import { isBrowser } from 'react-device-detect';

const Item = styled.h3`

  font-size: 0.8em;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const Sidebar = props => {
    return (
        <>
            <Nav className="col-md-12 sidebar"
            >
                {isBrowser ?
                    <div className="sidebar-content" >
                        <Nav.Item>
                            <Nav.Link onClick={() => {
                                animateScrollTo(document.querySelector("#home"));
                            }}
                            ><Item>O'howdy</Item></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => {
                                animateScrollTo(document.querySelector("#generative"));
                            }}
                            ><Item>Generative Projects</Item></Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                        <Link to='/blog'><Item>Blog</Item></Link>
                    </Nav.Item>   */}
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => { animateScrollTo(document.querySelector("#music")); }}
                            ><Item>Music</Item></Nav.Link>
                        </Nav.Item>
                    </div>
                    :
                    <div>
                    </div>
                }
            </Nav>

        </>
    );
};
export default Sidebar