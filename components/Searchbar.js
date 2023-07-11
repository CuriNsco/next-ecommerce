import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder="Search for products..."
      className="bg-gray-200 rounded-full text-center my-4 py-2 flex
      sm:bg-gray-200 sm:py-2 sm:px-36 sm:rounded-xl sm:text-center sm:flex"
    />
  );
}
