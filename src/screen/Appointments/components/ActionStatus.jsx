import React, { Fragment, useState } from "react";
import StatusCard, { statusType } from "../../Home/components/StatusCard";
import ButtonAssign from "./ButtonAssign";
import CommonStyles from "../../../components/CommonStyles";
import Accept from "../../../assets/icons/Accept";
import Close from "../../../assets/icons/Close";
import Delay from "../../../assets/icons/Delay";
import useToggleDialog from "../../../hooks/useToggleDialog";
import DelayDialogContent from "./DelayDialogContent";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import { isEmpty } from "lodash";

const ActionStatus = ({ data }) => {
  //! State
  const { visitTime, doctor, status, patient, id } = data;
  const [loading, setLoading] = useState(false);
  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );
  const { device_tokens, name, email } = patient;

  const {
    open: openDelayDialog,
    toggle: toggleDelayDialog,
    shouldRender: shouldRenderDelayDialog,
  } = useToggleDialog();

  //! Function
  const handleChangeStatus = async (status) => {
    const toastId = toast.loading("Updating appointment...", {
      isLoading: true,
      autoClose: false,
    });
    setLoading(true);

    try {
      await FirebaseServices.updateAppointmentStatus(id, status);

      await refetchListAppointment();

      if (!isEmpty(device_tokens)) {
        FirebaseServices.sendNoti(
          device_tokens,
          "Appointment status changed",
          `Your appointment status has been changed to ${status} !`
        );
      }
      if (email) {
        FirebaseServices.sendEmailChangeStatus(
          email,
          name,
          doctor.name,
          status
        );
      }

      toast.update(toastId, {
        render: "Update appointment successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (error) {
      console.log("err", error);
      toast.update(toastId, {
        render: "Update appointment failed",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    } finally {
      setLoading(false);
    }
  };

  //! Render
  const renderStatus = () => {
    if (status === statusType.declined.toLowerCase()) {
      return <StatusCard status={status} />;
    }

    if (
      status === statusType.pending.toLowerCase() &&
      (!visitTime || !doctor)
    ) {
      return <ButtonAssign data={data} />;
    }

    if (status === statusType.pending.toLowerCase() && !!doctor) {
      return (
        <CommonStyles.Box
          centered
          sx={{
            gap: "10px",
          }}
        >
          <CommonStyles.Button
            onClick={() => handleChangeStatus("confirmed")}
            sx={{
              borderRadius: "50px",
              gap: "5px",
              padding: "5px 20px 5px 15px",
            }}
            loading={loading}
          >
            <Accept fill={"#fff"} />
            <CommonStyles.Typography
              type="normal14"
              sx={{
                color: "#fff",
              }}
            >
              Accept
            </CommonStyles.Typography>
          </CommonStyles.Button>

          <CommonStyles.Button
            loading={loading}
            onClick={() => handleChangeStatus("declined")}
            sx={{
              borderRadius: "50px",
              gap: "5px",
              background: "#C8C8C8",
              padding: "5px 20px 5px 15px",
              "&:hover": {
                background: "#C8C8C8",
              },
              svg: {
                width: "15px",
                height: "15px",
              },
            }}
          >
            <Close fill={"#fff"} />
            <CommonStyles.Typography
              type="normal14"
              sx={{
                color: "#fff",
              }}
            >
              Decline
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    if (status === statusType.confirmed.toLowerCase()) {
      return (
        <CommonStyles.Box
          centered
          sx={{
            gap: "10px",
          }}
        >
          <CommonStyles.Button
            loading={loading}
            onClick={() => handleChangeStatus("complete")}
            sx={{
              borderRadius: "50px",
              gap: "5px",
              padding: "5px 20px 5px 15px",
            }}
          >
            <Accept fill={"#fff"} />
            <CommonStyles.Typography
              type="normal14"
              sx={{
                color: "#fff",
              }}
            >
              Complete
            </CommonStyles.Typography>
          </CommonStyles.Button>
          <CommonStyles.Button
            loading={loading}
            sx={{
              borderRadius: "50px",
              gap: "5px",
              padding: "5px 20px 5px 15px",
              background: "#F57E71",
              "&:hover": {
                background: "#F57E71",
              },
            }}
            onClick={toggleDelayDialog}
          >
            <Delay fill={"#fff"} />
            <CommonStyles.Typography
              type="normal14"
              sx={{
                color: "#fff",
              }}
            >
              Delay
            </CommonStyles.Typography>
          </CommonStyles.Button>
        </CommonStyles.Box>
      );
    }

    if (status === statusType.complete.toLowerCase())
      return <StatusCard status={status} />;
  };

  return (
    <Fragment>
      {renderStatus()}
      {shouldRenderDelayDialog && (
        <CommonStyles.Dialog
          open={openDelayDialog}
          handleClose={toggleDelayDialog}
          dialogContent={
            <DelayDialogContent
              toggle={toggleDelayDialog}
              appointmentId={id}
              device_tokens={device_tokens}
              email={email}
              patientName={name}
              doctorName={doctor.name}
            />
          }
        />
      )}
    </Fragment>
  );
};

export default ActionStatus;
