import React from "react";
import indexImages from "./galleryImgsIndex.json";


function Gallery() {

  const images = indexImages.images;
  console.log(images);

  return ( 
    <div style={{ color: "white" }}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <a href={'/blog/'+image.link} key={index}>
            <img  src={`/images/${image.file}`} alt={`Gallery image ${index}`} style={{ borderRadius: "10px", margin: "10px", maxWidth: "150px", maxHeight: "150px" }} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
