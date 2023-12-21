import CommonStyles from "../CommonStyles";
import { useTheme } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import CommonIcons from "../CommonIcons";
import { TextField } from "@mui/material";
import Avatar from "../../assets/Avatar.jpg";
import { navigation } from "../../constants/navigation";
import SidebarItem from "./Components/SidebarItem";
import Logo from "../../assets/logo";
import PerfectScrollbar from "react-perfect-scrollbar";

const DefaultLayout = (props) => {
  //! State
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: theme.colors.custom.background,
        paddingTop: "64px",
      }}
    >
      <CommonStyles.Box
        centered
        sx={{
          justifyContent: "space-between",
          width: "100vw",
          position: "fixed",
          padding: "12px 24px 12px 8px",
          top: 0,
        }}
      >
        <CommonStyles.Box
          centered
          sx={{
            gap: "16px",
          }}
        >
          <CommonStyles.IconButton
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            <CommonIcons.ArrowLeft
              style={{
                transition: "all 0.3s ease",
                transform: open ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          </CommonStyles.IconButton>
          <CommonStyles.IconButton onClick={() => navigate("/")}>
            <Logo />
          </CommonStyles.IconButton>
        </CommonStyles.Box>
        <CommonStyles.Box>
          <TextField
            placeholder="Search"
            sx={{
              width: "400px",
              input: {
                height: "20px",
                padding: "8px 12px",
              },
            }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box>
          <CommonStyles.Box centered sx={{ gap: "24px" }}>
            <CommonStyles.Box centered sx={{ gap: "8px" }}>
              <CommonStyles.IconButton>
                <CommonIcons.Setting />
              </CommonStyles.IconButton>
              <CommonStyles.IconButton hasNoti>
                <CommonIcons.Bell />
              </CommonStyles.IconButton>
            </CommonStyles.Box>
            <CommonStyles.Button
              sx={{ display: "flex", gap: "8px", textTransform: "none" }}
              variant="text"
            >
              <CommonStyles.Avatar src={Avatar} />
              <CommonStyles.Typography>Admin One</CommonStyles.Typography>
            </CommonStyles.Button>
          </CommonStyles.Box>
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          padding: "32px 0 0 0 ",
          width: open ? "13.75vw" : "0vw",
          transition: "all 0.3s ease",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <CommonStyles.Box>
          {navigation.map((item) => {
            return (
              <SidebarItem
                name={item.name}
                path={item.path}
                key={item.name}
                notiCount={item.path === "/messages" ? 2 : null}
              />
            );
          })}
        </CommonStyles.Box>
        <CommonStyles.Button
          centered
          variant="text"
          sx={{
            justifyContent: "start",
            gap: "8px",
            textTransform: "none",
            padding: "12px 12px 12px 24px",
            borderTop: `1px solid ${theme.colors.custom.borderColor}`,
          }}
        >
          <CommonIcons.QuestionMark
            style={{
              color: "#8F95A3",
            }}
          />
          <CommonStyles.Typography type="normal14" color="primaryText">
            Help
          </CommonStyles.Typography>
        </CommonStyles.Button>
      </CommonStyles.Box>
      <PerfectScrollbar style={{ maxHeight: "calc(100vh - 64px)" }}>
        <CommonStyles.Box
          sx={{
            width: "100%",
          }}
        >
          <Outlet />
        </CommonStyles.Box>
      </PerfectScrollbar>
      {/* <CommonStyles.Scheduler
        data={data}
        grouping={grouping}
        resources={resources}
        handleChangeScheduler={handleChangeScheduler}
        addedAppointment={addedAppointment}
        onCommitButtonClick={onCommitButtonClick}
      /> */}
    </CommonStyles.Box>
  );
};

export default DefaultLayout;
