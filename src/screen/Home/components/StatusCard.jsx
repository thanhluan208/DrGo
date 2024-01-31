import { useTheme } from "@mui/material";
import React from "react";
import CommonStyles from "../../../components/CommonStyles";

export const statusType = {
  1: "Pending",
  2: "Confirmed",
  3: "Completed",
  4: "Declined",
  5: "Declined",
};

const StatusCard = ({ status }) => {
  //! State
  const theme = useTheme();
  const statusText = status ? statusType[status] : "";

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        padding: "5px 8.5px",
        borderRadius: "16px",
        backgroundColor:
          theme.colors.custom[`status_${statusText?.toLowerCase()}`]
            ?.background,
      }}
    >
      <CommonStyles.Typography
        type="bold10"
        sx={{
          color:
            theme.colors.custom[`status_${statusText.toLowerCase()}`]?.text,
          fontWeight: "600",
        }}
      >
        {statusText}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default StatusCard;
