import React from "react";

function CardImage({ placeholder, src, alt, className }) {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

export default CardImage;
