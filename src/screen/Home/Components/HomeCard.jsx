import React from "react";
import CommonStyles from "../../../components/CommonStyles";

const HomeCard = ({ icon, title, content }) => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Card>
      <CommonStyles.Box
        sx={{
          padding: "24px",

          display: "flex",
          gap: "24px",
          width: "255px",
        }}
      >
        <CommonStyles.Box>{icon}</CommonStyles.Box>
        <CommonStyles.Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CommonStyles.Typography type="bold14">
            {title}
          </CommonStyles.Typography>
          <CommonStyles.Typography
            type="normal18"
            sx={{
              color: "#336CFB",
            }}
          >
            {content}
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Card>
  );
};

export default HomeCard;
