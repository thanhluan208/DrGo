import React from "react";

const Previous = ({ fill = "#E8E8E8", ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g opacity="0.7">
        <path
          d="M9.71199 2.93311L4.91199 7.73311L9.71199 12.5331L11.088 11.1731L7.64799 7.73311L11.088 4.29311L9.71199 2.93311Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default Previous;
