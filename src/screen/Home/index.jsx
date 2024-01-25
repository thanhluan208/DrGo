import CommonStyles from "../../components/CommonStyles";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { homeListCard } from "../../constants/navigation";
import i18n from "../../../i18n";
import dayjs from "dayjs";
import Edit from "../../assets/icons/Edit";
import Delete from "../../assets/icons/Delete";
import HomeCard from "./Components/Homecard";

const data = [
  {
    id: Math.random() * 100000,
    visitTime: "8:00-8:30am",
    name: "John Doe",
    contact: "+852 6351 6215",
    date: new Date(),
    doctor: "Dr. Jacob Jones",
    conditions: "Allergies, Coughs",
  },
  {
    id: Math.random() * 100000,
    visitTime: "8:00-8:30am",
    name: "John Doe",
    contact: "ronald.richards@example.com",
    date: new Date(),
    doctor: "Dr. Theresa Webb",
    conditions: "Colds",
  },
  {
    id: Math.random() * 100000,
    visitTime: "8:00-8:30am",
    name: "John Doe",
    contact: "+852 6351 6215",
    date: new Date(),
    doctor: "Dr. Jacob Jones",
    conditions: "Allergies, Coughs",
  },
  {
    id: Math.random() * 100000,
    visitTime: "8:00-8:30am",
    name: "John Doe",
    contact: "+852 6351 6215",
    date: new Date(),
    doctor: "Dr. Jacob Jones",
    conditions: "Allergies, Coughs,Allergies, Coughs,Allergies, Coughs",
  },
  {
    id: Math.random() * 100000,
    visitTime: "8:00-8:30am",
    name: "John Doe",
    contact: "jenny.wilson@example.com",
    date: new Date(),
    doctor: "Dr. Jacob Jones",
    conditions: "Diarrhea",
  },
];

const columns = [
  {
    id: "name",
    title: i18n.t("home.name"),
  },
  {
    id: "contact",
    title: i18n.t("home.contact"),
    width: 150,
    renderContent: (props) => {
      const { contact } = props;
      return (
        <CommonStyles.Tooltip title={contact}>
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: 130,
              }}
            >
              {contact}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "date",
    title: i18n.t("home.date"),
    renderContent: (props) => {
      const { date } = props;
      if (!date) return null;
      return (
        <CommonStyles.Typography type="normal14">
          {dayjs(date).format("DD/MM/YYYY")}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "visitTime",
    title: i18n.t("home.visitTime"),
    width: 150,
    renderContent: (props) => {
      const { visitTime } = props;
      if (!visitTime) return null;
      return (
        <CommonStyles.Typography type="normal14">
          {visitTime}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "doctor",
    title: i18n.t("home.doctor"),
    width: 150,
  },
  {
    id: "conditions",
    title: i18n.t("home.conditions"),
    width: 150,
    renderContent: (props) => {
      const { conditions } = props;
      return (
        <CommonStyles.Tooltip title={conditions}>
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: 130,
              }}
            >
              {conditions}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "action",
    title: "",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          centered
          sx={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <CommonStyles.IconButton>
            <Edit />
          </CommonStyles.IconButton>
          <CommonStyles.IconButton>
            <Delete />
          </CommonStyles.IconButton>
        </CommonStyles.Box>
      );
    },
  },
];

const Home = () => {
  //! State
  const { t } = useTranslation();

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
      sx={{
        padding: "21px 40px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          gap: "30px",
        }}
      >
        {homeListCard.map((elm) => {
          const { icon, title, content } = elm;
          return (
            <HomeCard icon={icon} title={title} content={content} key={title} />
          );
        })}
      </CommonStyles.Box>

      <CommonStyles.Card
        styles={{
          padding: "24px",
          marginTop: "38px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <CommonStyles.Typography type="bold20">
          {t("home.appointmentActivity")}
        </CommonStyles.Typography>

        <CommonStyles.Table
          columns={columns}
          data={data}
          disabledPagination
          totalPage={10}
          // tableWidth={1500}
        />
      </CommonStyles.Card>
    </CommonStyles.Box>
  );
};

export default Home;
