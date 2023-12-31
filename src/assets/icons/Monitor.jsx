import React from "react";

const Monitor = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M16 20L12 15L8 20H16Z"
        stroke="#D0165D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 17H4C3.44772 17 3 16.5523 3 16V6C3 5.44772 3.44772 5 4 5H20C20.5523 5 21 5.44772 21 6V16C21 16.5523 20.5523 17 20 17H18"
        stroke="#D0165D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Monitor;
