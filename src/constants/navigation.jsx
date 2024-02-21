import i18n from "../../i18n";
import AppointmentNav from "../assets/icons/AppointmentNav";
import ChatsNav from "../assets/icons/ChatsNav";
import HomeNav from "../assets/icons/HomeNav";
import MedicalAid from "../assets/icons/MedialAid";
import MedicalHuman from "../assets/icons/MedicalHuman";
import NotificationsNav from "../assets/icons/NotificationsNav";
import ScheduleNav from "../assets/icons/ScheduleNav";
import SettingsNav from "../assets/icons/SettingsNav";
import { FaUserDoctor, FaUser } from "react-icons/fa6";

export const navigation = [
  {
    path: "/",
    name: i18n.t("layout.home"),
    icon: (fill) => <HomeNav fill={fill} />,
  },
  {
    path: "/appointment",
    name: i18n.t("layout.appointment"),
    icon: (fill) => <AppointmentNav stroke={fill} />,
  },
  {
    path: "/schedule",
    name: i18n.t("layout.schedule"),
    icon: (fill) => <ScheduleNav fill={fill} />,
  },
  {
    path: "/chat",
    name: i18n.t("layout.chat"),
    icon: (fill) => <ChatsNav fill={fill} />,
  },
  {
    path: "/settings",
    name: i18n.t("layout.settings"),
    icon: (fill) => <SettingsNav fill={fill} />,
  },
  {
    path: "/notifications",
    name: i18n.t("layout.notifications"),
    icon: (fill) => <NotificationsNav fill={fill} />,
  },
  {
    path: "/doctor",
    name: i18n.t("layout.doctor"),
    icon: (fill) => (
      <FaUserDoctor
        style={{
          fill,
          width: "20px",
          height: "20px",
        }}
      />
    ),
  },
  {
    path: "/patient",
    name: i18n.t("layout.patients"),
    icon: (fill) => (
      <FaUser
        style={{
          fill,
          width: "20px",
          height: "20px",
        }}
      />
    ),
  },
];

export const homeListCard = [
  {
    icon: <MedicalAid />,
    title: i18n.t("home.appointments"),
    content: 213,
  },
  {
    icon: <MedicalHuman />,
    title: i18n.t("home.newPatient"),
    content: 104,
  },
];
