import React from "react";

function Input({ children, value, className, type, onChange, placeholder }) {
  return (
    <div>
      <input
        className={className}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      >
        {children}
      </input>
    </div>
  );
}

export default Input;
