import CommonStyles from "../CommonStyles";
import { useTheme } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSave } from "../../stores/useStores";
import { useTranslation } from "react-i18next";
import { navigation } from "../../constants/navigation";
import SidebarItem from "./Components/SidebarItem";
import Header from "./Components/Header";
import PerfectScrollbar from "react-perfect-scrollbar";

const sidebarWidth = "338px";
const screenWidth = window.innerWidth;

const DefaultLayout = (props) => {
  //! State
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const save = useSave();
  const [open, setOpen] = useState(screenWidth > 1200);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        background: theme.colors.custom.layoutBackground,
        display: "flex",
      }}
    >
      <CommonStyles.Box
        sx={{
          width: sidebarWidth,
          height: "100vh",
          background: theme.colors.white,
        }}
      >
        <CommonStyles.Box
          sx={{
            paddingTop: "36px",
            paddingLeft: "50px",
          }}
        >
          <CommonStyles.Typography type="bold24">
            {t("layout.dashboard")}
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "26px",
            marginTop: "56px",
            paddingRight: "56px",
          }}
        >
          {navigation.map((nav) => {
            const { name, path, icon } = nav;
            return (
              <SidebarItem
                name={name}
                path={path}
                key={name}
                icon={icon}
                notiCount={name === "Appointment" && 24}
              />
            );
          })}
        </CommonStyles.Box>
      </CommonStyles.Box>
      <PerfectScrollbar
        style={{
          maxHeight: "100vh",
        }}
      >
        <CommonStyles.Box
          sx={{
            width: `calc(100vw - ${sidebarWidth})`,
          }}
        >
          <Header />

          <Outlet />
        </CommonStyles.Box>
      </PerfectScrollbar>
    </CommonStyles.Box>
  );
};

export default DefaultLayout;
