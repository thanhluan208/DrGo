import React, { useCallback } from "react";
import CommonStyles from "../../CommonStyles";
import { Popover } from "@mui/material";
import { useAuthentication } from "../../../providers/AuthenticationProvider";
import { useTheme } from "@emotion/react";
import Box from "../../CommonStyles/Box";

const uuid = Math.random().toString(36).substring(7);

const User = () => {
  //! State
  const { handleLogout } = useAuthentication();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  //! Function
  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  //! Render
  return (
    <Box>
      <CommonStyles.IconButton onClick={handleOpen}>
        <CommonStyles.Box
          centered
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#E8E8E8",
          }}
        >
          <CommonStyles.Avatar
          // src={
          //   "https://i.pinimg.com/564x/73/e4/69/73e4692c5447a0ed7b0eac5d3e008469.jpg"
          // }
          />
        </CommonStyles.Box>
      </CommonStyles.IconButton>
      <Popover
        id={uuid}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          boxShadow: "none",
        }}
        slotProps={{
          paper: {
            sx: {
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
              borderRadius: "0 0 10px 10px",
              // paddingTop: "10px",
            },
          },
        }}
      >
        <CommonStyles.Box
          sx={{
            width: "158px",
            padding: "10px 20px",
          }}
        >
          <CommonStyles.Button
            onClick={handleLogout}
            variant="text"
            sx={{
              width: "100%",
            }}
          >
            <CommonStyles.Typography type="normal14" sx={{ fontWeight: 600 }}>
              Logout
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      </Popover>
    </Box>
  );
};

export default User;
