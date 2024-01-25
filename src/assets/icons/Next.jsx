import React from "react";

const Next = ({ fill, ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M6.28799 12.5331L11.088 7.73311L6.28799 2.93311L4.92799 4.29311L8.35199 7.73311L4.91199 11.1731L6.28799 12.5331Z"
        fill={fill}
      />
    </svg>
  );
};

export default Next;
