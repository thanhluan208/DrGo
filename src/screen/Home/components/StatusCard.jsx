import { useTheme } from "@mui/material";
import React from "react";
import CommonStyles from "../../../components/CommonStyles";

export const statusType = {
  pending: "Pending",
  confirmed: "Confirmed",
  complete: "Complete",
  declined: "Declined",
};

const StatusCard = ({ status, content }) => {
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
        {content || statusText}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default StatusCard;
