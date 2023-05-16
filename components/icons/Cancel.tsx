import React from "react";

export const Cancel = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-x-square"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <line x1="9" x2="15" y1="9" y2="15"></line>
      <line x1="15" x2="9" y1="9" y2="15"></line>
    </svg>
  );
};
