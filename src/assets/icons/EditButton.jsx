import React from "react";

const EditButton = ({ fill, ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clip-path="url(#clip0_1250_1127)">
        <path
          d="M14.472 0.194394C14.4101 0.132309 14.3365 0.0830521 14.2555 0.0494435C14.1745 0.0158349 14.0877 -0.00146484 14 -0.00146484C13.9123 -0.00146484 13.8255 0.0158349 13.7445 0.0494435C13.6635 0.0830521 13.5899 0.132309 13.528 0.194394L0 13.7237V19.3331C0 19.5099 0.0702379 19.6794 0.195262 19.8045C0.320286 19.9295 0.489856 19.9997 0.666667 19.9997H6.276L19.8053 6.47173C19.8674 6.4098 19.9167 6.33623 19.9503 6.25524C19.9839 6.17424 20.0012 6.08742 20.0012 5.99973C20.0012 5.91204 19.9839 5.82521 19.9503 5.74422C19.9167 5.66322 19.8674 5.58965 19.8053 5.52773L14.472 0.194394Z"
          fill="#2563EB"
        />
      </g>
      <defs>
        <clipPath id="clip0_1250_1127">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default EditButton;
