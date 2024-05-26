/* eslint-disable react/prop-types */
import React from "react";

export default function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`border-2 rounded-md px-4 py-2 bg-blue-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
