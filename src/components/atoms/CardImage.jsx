import React from "react";

function CardImage({ placeholder, image, alt }) {
  return (
    <div>
      <img src={image} alt={alt} onError={placeholder} />
    </div>
  );
}

export default CardImage;
