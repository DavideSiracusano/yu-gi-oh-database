import React from "react";

function Button({ children, className, type, onClick, placeholder }) {
  return (
    <div>
      <button
        className={className}
        type={type}
        onClick={onClick}
        placeholder={placeholder}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
