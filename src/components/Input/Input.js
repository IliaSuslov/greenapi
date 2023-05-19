import React, { useRef } from "react";

export function Input({ placeholder, onChange, required, onEnterPress }) {
  const inputRef = useRef(null);
  const handleChange = () => {
    const value = inputRef.current.value;
    onChange && onChange(value);
  };
  const onKeyPress = (e) => {
    const value = inputRef.current.value;
    if (e.key === "Enter") {
      onEnterPress(value);
      inputRef.current.value = "";
    }
  };
  return (
    <input
      type="text"
      ref={inputRef}
      placeholder={placeholder}
      className="w-full h-8 rounded-lg bg-gray-500 pl-4"
      required={required}
      onChange={handleChange}
      onKeyDown={onKeyPress}
    />
  );
}
