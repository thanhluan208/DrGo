import React, { useRef, useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import { statusOptions } from "../../../constants/options";
import FirebaseServices from "../../../services/firebaseServices";
import { toast } from "react-toastify";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import axios from "axios";

const SelectStatus = ({ data }) => {
  //! State
  const { status, patient, doctor } = data;
  const { name, email, device_tokens } = patient;

  const refetchListAppointment = useGet(
    cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT
  );
  const [loading, setLoading] = useState(false);

  //! Function

  const sendNoti = async (listRegist) => {
    return axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        registration_ids: listRegist,
        notification: {
          title: "Appointment status changed",
          body: "Your appointment status has been changed to",
          mutable_content: true,
          sound: "Tri-tone",
        },
      },
      {
        headers: {
          Authorization:
            "key=AAAAchhm6xE:APA91bGPZZ8II_22wr5KHsRQCaJiraV7gx3Pg1WMIRzb7GLKrMQbERHBGnnxuQO2wWzev7sOohHCrCARaf8iJ8iY-PJa2BwPnRaYLrYXjx24Va-C1fCnEjtYaUmRn-GrDwyfxQIUTz1J",
        },
      }
    );
  };

  const sendEmail = async (newStatus) => {
    return axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: "service_rj5v25q",
      template_id: "template_lkekyp9",
      user_id: "p848yyVNrCz4R28tY",
      template_params: {
        patientName: name,
        toEmail: "skthunte33@gmail.com",
        fromName: "DrGo",
        doctorName: doctor?.name,
        hospital: "DrGo Hospital",
        newStatus,
        reply_to: "",
        fromEmail: "thanhluan20880@gmail.com",
      },
    });
  };

  const handleChange = async (event) => {
    const toastId = toast.loading(
      `Changing ${patient?.name}'s appointment status`,
      {
        autoClose: false,
        isLoading: true,
      }
    );
    setLoading(true);
    try {
      await FirebaseServices.updateAppointmentStatus(
        data?.id,
        event.target.value
      );

      const responseSendNoti = await sendNoti([
        ...patient?.device_tokens,
        "fbignC-QHgr4SCmyarAFRP:APA91bFv66Yt3E65DtXI1TUoQVc50_GNRimoK9ndtG9-djvxGV-FlZXHDomLa4vZZFCpTN9eLeeo_NCpAGq43lEg2ynVlXLdvzwVarFHBx82NnWcvGCHPEAv1Np0EdJBwIZjGM5u5OHU",
      ]);

      const newStatus = statusOptions.find(
        (elm) => elm.value === +event.target.value
      );
      const responseSendEmail = await sendEmail(newStatus.label);

      await refetchListAppointment();

      toast.update(toastId, {
        render: "Change status successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (error) {
      console.log("err", error);
      toast.update(toastId, {
        render: "Change status failed",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    }
    setLoading(false);
  };
  //! Render
  return (
    <CommonStyles.Select
      options={statusOptions}
      value={status}
      onChange={handleChange}
      fullWidth
      disabled={loading}
      loading={loading}
      sxContent={{
        justifyContent: "space-between",
      }}
      sx={{
        paddingRight: "10px !important",
      }}
    />
  );
};

export default SelectStatus;
