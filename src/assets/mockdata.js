import dayjs from "dayjs";
import Avatar from "./Avatar.jpg";

export const doctor = [
  {
    text: JSON.stringify({
      name: "Abril Lewis",
      avatar: Avatar,
      title: "Physician",
    }),
    id: 1,
  },
  {
    text: JSON.stringify({
      name: "Allan Hicks",
      avatar: Avatar,
      title: "Physician",
    }),
    id: 2,
  },
  {
    text: JSON.stringify({
      name: "Bianca Health",
      avatar: Avatar,
      title: "Nurse practitioner",
    }),
    id: 3,
  },
  {
    text: JSON.stringify({
      name: "Emmy Massey",
      title: "Physician assistant",
    }),
    id: 4,
  },
];

export const grouping = [
  {
    resourceName: "doctor",
  },
];

export const appointments = [
  {
    id: 0,
    patientName: "Robert Fox",
    doctor: [1],
    startDate: dayjs("2023-12-22 08:30:00").toDate(),
    endDate: dayjs("2023-12-22 10:30:00").toDate(),
    type: "checked out",
  },
  {
    id: 1,
    patientName: "Cody Fisher",
    doctor: [4],
    startDate: dayjs("2023-12-22 11:00:00").toDate(),
    endDate: dayjs("2023-12-22 12:30:00").toDate(),
    type: "checked in",
  },
  {
    id: 4,
    patientName: "Cameron Williamson",
    doctor: [3],
    startDate: dayjs("2023-12-22 13:00:00").toDate(),
    endDate: dayjs("2023-12-22 14:30:00").toDate(),
    type: "confirmed",
  },
  {
    id: 2,
    patientName: "Daisy Phillips",
    doctor: [2],
    startDate: dayjs("2023-12-22 15:00:00").toDate(),
    endDate: dayjs("2023-12-22 16:30:00").toDate(),
    type: "scheduled",
  },
  {
    id: 3,
    patientName: "Leah Curtis",
    doctor: [2],
    startDate: dayjs("2023-12-22 23:00:00").toDate(),
    endDate: dayjs("2023-12-23 00:00:00").toDate(),
    type: "none",
  },
];

export const resources = [
  {
    fieldName: "doctor",
    title: "doctor",
    instances: doctor,
    allowMultiple: true,
  },
];
