import React from "react";
import { Title } from "./textConstants";
import jsonData from './generativeProjects.json';
import GenerativeItem from "./GenerativeItem";


function RenderGenProjects(props) {
  const items = props.items
  const listItems = items.map((item) =>

    <div key={item.title}>
      <GenerativeItem content={item} />
    </div>

  );
  return <div>{listItems}</div>;
}

const GenerativePortfolio = props => {

  return (
    <div id="generative" style={{ marginTop: "2%", paddingLeft: "5%", alignContent: "right" }} >
      <Title>
        Generative Projects
      </Title>

      <RenderGenProjects items={jsonData} />

    </div>
  );
};
export default GenerativePortfolio