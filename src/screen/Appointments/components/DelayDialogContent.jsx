import React, { useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Close from "../../../assets/icons/Close";
import { useTheme } from "@mui/material";
import ButtonSelectDate from "./ButtonSelectDate";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";

const delay = [5, 10, 15];

const DelayDialogContent = ({
  toggle,
  appointmentId,
  patientName,
  device_tokens,
  email,
  doctorName,
}) => {
  //! State
  const [delayTime, setDelayTime] = useState(10);
  const theme = useTheme();

  //! Function
  const handleChange = (value) => {
    console.log("value", value);
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Updating appointment...", {
      isLoading: true,
      autoClose: false,
    });

    try {
      await FirebaseServices.updateAppointmentDelay(appointmentId, delayTime);

      if (device_tokens) {
        FirebaseServices.sendNoti(
          device_tokens,
          "Appointment delayed",
          `Your appointment has been delayed by ${delayTime} minutes!`
        );
      }

      if (email) {
        FirebaseServices.sendEmailDelayed(
          email,
          patientName,
          doctorName,
          delayTime
        );
      }

      toast.update(toastId, {
        render: "Appointment updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to update appointment!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        width: 500,
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px",
          borderBottom: "solid 1px #E8E8E8",
        }}
      >
        <CommonStyles.Typography type="bold20">
          Select Delay Time
        </CommonStyles.Typography>

        <CommonStyles.IconButton onClick={toggle}>
          <Close />
        </CommonStyles.IconButton>
      </CommonStyles.Box>

      <CommonStyles.Box
        sx={{
          padding: "42px 125px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {delay.map((item) => {
          return (
            <CommonStyles.Button
              variant={delayTime === item ? "contained" : "outlined"}
              sx={{
                padding: "15px 25px 15px 20px",
                width: "100%",
                borderRadius: "50px",
              }}
              onClick={() => setDelayTime(item)}
            >
              <CommonStyles.Typography
                type="normal20"
                sx={{
                  color:
                    delayTime === item ? "#fff" : theme.palette.primary.main,
                }}
              >
                {item} minutes
              </CommonStyles.Typography>
            </CommonStyles.Button>
          );
        })}

        <ButtonSelectDate handleChange={handleChange} />
      </CommonStyles.Box>

      <CommonStyles.Box
        centered
        sx={{
          marginBottom: "24px",
          padding: "0 24px",
          justifyContent: "space-between",
        }}
      >
        <CommonStyles.Button
          variant="outlined"
          color="error"
          sx={{
            padding: "15px 24px",
            borderRadius: "8px",
          }}
        >
          <CommonStyles.Typography
            type="normal10"
            sx={{
              color: theme.palette.primary.error,
            }}
          >
            Cancel
          </CommonStyles.Typography>
        </CommonStyles.Button>
        <CommonStyles.Button
          type="submit"
          onClick={handleSubmit}
          sx={{
            boxShadow: "0px 6px 12px 0px rgba(51, 108, 251, 0.16)",
            padding: "15px 24px",
            borderRadius: "8px",
          }}
        >
          <CommonStyles.Typography
            type="normal10"
            sx={{
              color: "#fff",
            }}
          >
            Save
          </CommonStyles.Typography>
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default DelayDialogContent;
