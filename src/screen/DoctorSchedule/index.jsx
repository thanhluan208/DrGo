import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetDoctorById from "../../hooks/schedule/useGetDoctorById";
import CommonStyles from "../../components/CommonStyles";
import { CircularProgress, useTheme } from "@mui/material";
import Add from "../../assets/icons/Add";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../components/CommonStyles/Button";
import EditButton from "../../assets/icons/EditButton";
import FilterAndScheduler from "./Components/FilterAndScheduler";
import routes from "../../constants/route";

const DoctorSchedule = () => {
  //! State
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = params || {};

  const { t } = useTranslation();

  const { data, isLoading } = useGetDoctorById(id);

  const { name, avatar, description } = data || {};

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "0 40px",
        paddingBottom: "40px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isLoading ? (
          <CommonStyles.Box>
            <CircularProgress />
          </CommonStyles.Box>
        ) : (
          <CommonStyles.Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CommonStyles.Box>
              <CommonStyles.Typography
                type="bold40"
                sx={{
                  color: "#25282B",
                }}
              >
                {name}
              </CommonStyles.Typography>
              <CommonStyles.Typography
                type="normal12"
                sx={{
                  color: "#606C80",
                }}
              >
                {description}
              </CommonStyles.Typography>
            </CommonStyles.Box>
            <CommonStyles.Box
              sx={{
                display: "flex",
                gap: "11px",
                marginTop: "24px",
              }}
            >
              <CommonStyles.Button buttonType={ButtonType.ACTIVE}>
                <CommonStyles.Typography
                  type="bold14"
                  sx={{
                    color: theme.colors.white,
                  }}
                >
                  {t("schedule.available")}
                </CommonStyles.Typography>
              </CommonStyles.Button>
              <CommonStyles.Button buttonType={ButtonType.UNACTIVE}>
                <CommonStyles.Typography
                  type="bold14"
                  sx={{
                    color: theme.colors.white,
                  }}
                >
                  {t("schedule.unavailable")}
                </CommonStyles.Typography>
              </CommonStyles.Button>
            </CommonStyles.Box>
          </CommonStyles.Box>
        )}

        <CommonStyles.Box
          sx={{
            display: "flex",
            gap: "14px",
          }}
        >
          <CommonStyles.Button
            onClick={() => {
              navigate(`${routes.doctorSchedule}/${id}/addNew`);
            }}
            buttonType={ButtonType.PRIMARY}
            sx={{
              boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
            }}
          >
            <Add />
            <CommonStyles.Typography
              type="normal20"
              sx={{
                color: "#fff",
              }}
            >
              {t("schedule.newSchedule")}
            </CommonStyles.Typography>
          </CommonStyles.Button>
          <CommonStyles.Button
            buttonType={ButtonType.SECONDARY}
            onClick={() => {
              navigate(`${routes.doctorSchedule}/${id}/edit`);
            }}
          >
            <EditButton />
            <CommonStyles.Typography
              type="normal20"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              {t("schedule.editSchedule")}
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Box>

      <FilterAndScheduler doctor={id} />
    </CommonStyles.Box>
  );
};

export default DoctorSchedule;
