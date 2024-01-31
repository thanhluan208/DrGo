import React from "react";
import CommonStyles from "../components/CommonStyles";

const Incomming = () => {
  return (
    <CommonStyles.Box
      centered
      sx={{
        width: "100%",
        height: "90vh",
      }}
    >
      <CommonStyles.Typography
        type="bold40"
        sx={{
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        {"Incomming feature, \n please wait for next update"}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default Incomming;
