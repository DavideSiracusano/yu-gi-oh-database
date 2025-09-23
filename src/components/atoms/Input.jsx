import React from "react";

function Input({ children, className, type, onClick, placeholder }) {
  return (
    <div>
      <input
        className={className}
        type={type}
        onClick={onClick}
        placeholder={placeholder}
      >
        {children}
      </input>
    </div>
  );
}

export default Input;
