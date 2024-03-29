import React from "react";

const NotificationsNav = ({ fill, ...otherProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 17.1C9.2 17.1 6.9 14.8 6.9 12C6.9 11.5 7.4 11 7.9 11C8.5 11 8.9 11.5 8.9 12C8.9 13.7 10.3 15.1 12 15.1C13.7 15.1 15.1 13.7 15.1 12C15.1 11.5 15.5 11 16.1 11C16.6 11 17.1 11.5 17.1 12C17.1 14.8 14.8 17.1 12 17.1Z"
        fill={fill}
      />
    </svg>
  );
};

export default NotificationsNav;
