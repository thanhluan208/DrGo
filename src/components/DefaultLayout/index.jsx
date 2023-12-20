import CommonStyles from "../CommonStyles";
import { useTheme } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const DefaultLayout = (props) => {
  //! State
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        height: "100vh",
        width: "100vw",
        background: theme.colors.custom.background,
      }}
    >
      <CommonStyles.Scheduler />
    </CommonStyles.Box>
  );
};

export default DefaultLayout;
