import moment from "moment";
import Avatar from "./Avatar.jpg";

export const PST = [
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
    resourceName: "pst",
  },
];

export const appointments = [
  {
    id: 0,
    customer: "Robert Fox",
    pst: [1],
    startDate: moment("2023-12-20 08:30:00"),
    endDate: moment("2023-12-20 10:30:00"),
    type: "checked out",
  },
  {
    id: 1,
    customer: "Cody Fisher",
    pst: [4],
    startDate: moment("2023-12-20 11:00:00"),
    endDate: moment("2023-12-20 12:30:00"),
    type: "checked in",
  },
  {
    id: 4,
    customer: "Cameron Williamson",
    pst: [3],
    startDate: moment("2023-12-20 13:00:00"),
    endDate: moment("2023-12-20 14:30:00"),
    type: "confirmed",
  },
  {
    id: 2,
    customer: "Daisy Phillips",
    pst: [2],
    startDate: moment("2023-12-20 15:00:00"),
    endDate: moment("2023-12-20 16:30:00"),
    type: "scheduled",
  },
  {
    id: 3,
    customer: "Leah Curtis",
    pst: [2],
    startDate: moment("2023-12-20 23:00:00"),
    endDate: moment("2023-12-21 10:30:00"),
    type: "none",
  },
];

export const resources = [
  {
    fieldName: "pst",
    title: "pst",
    instances: PST,
    allowMultiple: true,
  },
];
