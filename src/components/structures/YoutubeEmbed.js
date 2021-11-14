import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = (props) => (
  <div className="video-responsive">
    <iframe
      width="600"
      height="400"
      src={props.link}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);


export default YoutubeEmbed;
