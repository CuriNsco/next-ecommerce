import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Search for products..."
      className="bg-gray-200 py-2 px-36 rounded-xl text-center flex"
    />
  );
}
