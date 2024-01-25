import React from "react";

const Check = ({ fill, ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.36364 2C3.55083 2 2 3.51251 2 5.33333V7.57692C2 9.52226 3.57427 10.8763 5.2933 10.9975C5.31671 10.9992 5.34017 11 5.36364 11H7.63636C9.44917 11 11 9.48749 11 7.66667V5.33333C11 3.56383 9.59068 2 7.72727 2H5.36364ZM16.3636 2C14.5508 2 13 3.51251 13 5.33333V7.66667C13 9.48749 14.5508 11 16.3636 11H18.6364C20.4492 11 22 9.48749 22 7.66667V5.33333C22 3.56383 20.5907 2 18.7273 2H16.3636ZM5.36364 13C3.55083 13 2 14.5125 2 16.3333V18.6667C2 20.5453 3.59974 21.8781 5.2933 21.9975C5.31671 21.9992 5.34017 22 5.36364 22H7.63636C9.44917 22 11 20.4875 11 18.6667V16.3333C11 14.5638 9.59068 13 7.72727 13H5.36364ZM16.3636 13C14.5508 13 13 14.5125 13 16.3333V18.6667C13 20.4875 14.5508 22 16.3636 22H18.6364C20.4492 22 22 20.4875 22 18.6667V16.3333C22 14.5638 20.5907 13 18.7273 13H16.3636Z"
        fill={fill}
      />
    </svg>
  );
};

export default Check;
