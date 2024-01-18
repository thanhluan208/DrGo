import { TextField } from "@mui/material";
import CommonStyles from "../../components/CommonStyles";
import { useState } from "react";
import { toast } from "react-toastify";
import httpService from "../../services/httpServices";
import axios from "axios";

const Home = () => {
  //! State
  const [text, setText] = useState("");

  //! Function
  const handleSendNotification = async () => {
    const toastId = toast.loading("Sending notification...", {
      autoClose: false,
    });

    try {
      const listFcmIds = text.split(",");

      listFcmIds.map((elm) => elm.trim());

      const sendNoti = axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          registration_ids: listFcmIds,
          notification: {
            title: "Your Position and Estimated Wait Time Information",
            body: "Currently, your queue number is 28. There are 10 individuals ahead of you in the queue, and your estimated waiting time is 30 minutes.",
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

      const sendEmail = axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          service_id: "service_rj5v25q",
          template_id: "template_azvhnbd",
          user_id: "p848yyVNrCz4R28tY",
          template_params: {
            patientName: "patient",
            toEmail: "skthunte33@gmail.com",
            fromName: "DrGo",
            to_name: "Luan 2",
            doctorName: "Dr. Maria Watson",
            hospital: "DrGo Hospital",
            queueNumber: "28",
            personAhead: "10",
            estTime: "30 minutes",
          },
        }
      );

      const reqList = [sendNoti, sendEmail];

      const response = await axios.all(reqList);

      // const data = response.data;

      // if (data?.success === listFcmIds.length) {
      //   toast.update(toastId, {
      //     render: "Send notification successfully",
      //     type: toast.TYPE.SUCCESS,
      //     autoClose: 3000,
      //     isLoading: false,
      //   });
      // }

      console.log("response", response);
      toast.update(toastId, {
        render: "Send notification successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        isLoading: false,
      });
    } catch (error) {
      console.log("error", error);
      toast.update(toastId, {
        render: "Send notification failed",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  //! Render

  return (
    <CommonStyles.Box
      centered
      sx={{
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* <CommonStyles.CustomScheduler /> */}
      <TextField
        type="textaria"
        onChange={(e) => setText(e.target.value)}
        value={text}
        label="FCM ID"
        fullWidth
        multiline
        rows={4}
        placeholder="Enter FCM ID, separate by comma"
      />
      <CommonStyles.Box
        center
        sx={{
          gap: "20px",
        }}
      >
        <CommonStyles.Button onClick={handleSendNotification}>
          Send notification & mail
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Home;
