import React from "react";
import CommonStyles from "../../components/CommonStyles";
import { useTranslation } from "react-i18next";
import useFilter from "../../hooks/useFilter";
import {
  CircularProgress,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import Search from "../../assets/icons/Search";
import useGetListDoctor from "../../hooks/appointments/useGetListDoctor";
import { isEmpty } from "lodash";
import DoctorItem from "./components/DoctorItem";

const Schedule = () => {
  //! State
  const { filters } = useFilter();
  const theme = useTheme();
  const { t } = useTranslation();

  const { data: listDoctor, isLoading } = useGetListDoctor();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: " 0 40px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <CommonStyles.Typography
          type="bold40"
          sx={{
            color: "#25282B",
          }}
        >
          {t("schedule.selectDoctor")}
        </CommonStyles.Typography>
        {isLoading && (
          <CommonStyles.Box>
            <CircularProgress />
          </CommonStyles.Box>
        )}
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          marginTop: "24px",
          fieldset: {
            border: "none",
          },
          input: {
            height: "30px",
            padding: 0,
          },
        }}
      >
        <TextField
          fullWidth
          sx={{
            background: theme.colors.white,
            borderRadius: "50px",
            padding: "10px 18px",
          }}
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  marginRight: "12px",
                }}
              >
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          marginTop: "55px",
          display: "flex",
          gap: "25px",
          flexDirection: "column",
        }}
      >
        {!isEmpty(listDoctor) &&
          listDoctor?.map((elm) => {
            return <DoctorItem key={elm?.id} doctor={elm} />;
          })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Schedule;
