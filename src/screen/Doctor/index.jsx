import React from "react";
import CommonStyles from "../../components/CommonStyles";
import TableDoctor from "./components/TableDoctor";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material";
import CreateButton from "./components/CreateButton";

const Doctor = () => {
  //! State
  const { t } = useTranslation();
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "0 40px",
        paddingBottom: "100px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <CommonStyles.Typography
          type="bold40"
          sx={{
            color: "#25282B",
          }}
        >
          Doctor
        </CommonStyles.Typography>

        <CreateButton />
      </CommonStyles.Box>

      <TableDoctor />
    </CommonStyles.Box>
  );
};

export default Doctor;
