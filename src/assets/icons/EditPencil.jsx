import React from "react";

const EditPencil = (props) => {
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
        d="M4 20H20"
        stroke="#D0165D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4 19.9998H8L19.2929 8.70696C19.6834 8.31643 19.6834 7.68327 19.2929 7.29274L16.7071 4.70696C16.3166 4.31643 15.6834 4.31643 15.2929 4.70696L4 15.9998V19.9998Z"
        stroke="#D0165D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 8L16 12"
        stroke="#D0165D"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default EditPencil;
