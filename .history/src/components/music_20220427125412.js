import React from "react";
// import tensen from "../images/gardenArtist2.png";
import tensenIm from "../images/dawn_chorus_1.png";
import springwalk from "../images/springwalk.png";

import { Item, Title } from "./textConstants";
import SpotifyPlayer from 'react-spotify-player';



class Music extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="music" style = {{height:"100vh"}}>
        <section  style={{backgroundColor:"white",height:"100vh",marginLeft:"0%", marginTop:"0%",backgroundSize: "100%"}}>
          <Title>
            Music - Tensen Park
          </Title>  

          <Item style={{fontSize: "1.2em",textAlign:"left",margin:"5%", color:"black"}}>
          Nothing can move me to interesting mental spaces like music can. I love this quote by Aldous Huxley:
          </Item>
          
          <Item style={{fontSize: "1.2em",textAlign:"left",paddingLeft:"15%",paddingRight:"15%", color:"red"}}>
          <i>After silence, that which comes nearest to expressing the inexpressible is music.</i>
          </Item>

          <Item style={{fontSize: "1.2em",textAlign:"left",margin:"5%", color:"black"}}>
          Listen to it <a2 href="https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=maU5dB7ZRSy00-uf5L6i2A">on spotify</a2>
          </Item>
          
         </section>
      </div>
    );
  }
}
export default Music













// import React from "react";
// import {Item, Title} from "./textConstants"
// import { SocialIcon } from 'react-social-icons';
// import SpotifyPlayer from 'react-spotify-player';




// const Music = props => {
//     return (<div id="about">
//             <Title>
//             Music
//             </Title>
        
//             <div id="about" style = {{height:"100vh",width:"50vw",marginLeft:"10%"}}>
                
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>
//                   My music compositions are released as Tensen Park. 
//                   I'm explore a balance between chaos and order using computational/ai methods and old analog equipment. 
//                   For more on my music endeavors, please visit my label Garden Walk Records. 
//                 </Item>
                
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>
//                 We release experiments in sound. This can be from coding endeavors, to glitching old analog equipment.</Item>
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>
//                 This label provides artists with a platform to keep a record of research, and further integrate and cultivate these into beautiful music.
//                 </Item> 
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>
//                 Much like plants in a garden, we display our releases, and hopefully polinate and cross-over into new directions. </Item>      
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>
//                 Aside from experimenting, this is about making beautiful music. The vision and approach is what unites the artists
//                 </Item> 
//                 <SpotifyPlayer
//                     uri="spotify:playlist:0Jj7QATvomwaJVjAK5N465"
//                     size={{
//                         width: '50%',
//                         height: 100,
//                       }}
//                     view={'list'}
//                     theme={'white'}
//                     /><SpotifyPlayer
//                     uri="spotify:album:2kkAIsp8sb5DvzggHGt4pl"
//                     size={{
//                         width: '50%',
//                         height: 100,
//                       }}
//                     view={'coverart'}
//                     theme={'white'}
//                     />
//                 <Item style={{fontSize: "1.2em",textAlign:"left"}}>

//                 </Item> 
//                 <SocialIcon width="100%" url="https://www.instagram.com/gardenwalk.records/" bgColor="white"/>
                
//             </div>


            
//         </div>
//         );
//   };
//   export default Music