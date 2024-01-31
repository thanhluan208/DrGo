import CommonStyles from "../../components/CommonStyles";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { homeListCard } from "../../constants/navigation";
import i18n from "../../../i18n";
import dayjs from "dayjs";
import Edit from "../../assets/icons/Edit";
import Delete from "../../assets/icons/Delete";
import HomeCard from "./HomeCard";
import useGetListAppointment from "../../hooks/appointments/useGetListAppointment";
import StatusCard from "./components/StatusCard";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/route";

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
    id: "date",
    title: i18n.t("home.date"),
    renderContent: (props) => {
      const { startDate } = props;
      if (!startDate) return null;
      return (
        <CommonStyles.Typography type="normal14">
          {dayjs(startDate).format("DD/MM/YYYY")}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "visitTime",
    title: i18n.t("home.visitTime"),
    renderContent: (props) => {
      const { startDate, endDate } = props;
      if (!startDate || !endDate) return null;
      return (
        <CommonStyles.Typography type="normal14">
          {dayjs(startDate).format("hh:mm")} - {dayjs(endDate).format("hh:mma")}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "doctor",
    title: i18n.t("home.doctor"),
    renderContent: (props) => {
      const { doctor } = props;
      if (!doctor) return null;

      const { name } = doctor;

      return (
        <CommonStyles.Typography type="normal14">
          {name}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "status",
    title: i18n.t("home.status"),
    renderContent: (props) => {
      const { status } = props;
      return <StatusCard status={status} />;
    },
  },
];

const filters = {
  page: 1,
  pageSize: 5,
};

const Home = () => {
  //! State
  const { t } = useTranslation();
  const navigate = useNavigate();

  //! Function
  const {
    data: listAppointment,
    isLoading: loadingListAppointment,
    error,
    refetch: refetchListAppointment,
  } = useGetListAppointment(filters);

  console.log("list", listAppointment);

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
          data={listAppointment}
          disabledPagination
          totalPage={10}
          loading={loadingListAppointment}
          // tableWidth={1500}
        />
      </CommonStyles.Card>
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CommonStyles.Button
          sx={{
            marginTop: "32px",
            padding: "5px 20px 5px 15px",
            borderRadius: "50px",
          }}
          onClick={() => {
            navigate(`${routes.appointment}?tab=1`);
          }}
        >
          <CommonStyles.Typography
            type="normal14"
            sx={{
              color: "#fff",
            }}
          >
            {t("home.viewMore")}
          </CommonStyles.Typography>
        </CommonStyles.Button>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Home;
