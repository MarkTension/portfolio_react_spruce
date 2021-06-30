import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="400"
      height="200"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="autoplay"
      allowFullScreen="false"
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;