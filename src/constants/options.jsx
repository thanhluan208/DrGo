import Monitor from "../assets/icons/Monitor";
import Phone from "../assets/icons/Phone";

export const schedulerTypes = [
  {
    value: "checkedOut",
    label: "Checked Out",
  },
  {
    value: "checkedIn",
    label: "Checked In",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "none",
    label: "None",
  },
];

export const pageSizeOptions = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: 100,
    label: "100",
  },
];

export const createdByType = {
  1: <Phone />,
  2: <Monitor />,
};

export const createdByOptions = [
  {
    value: 1,
    label: "Phone",
  },
  {
    value: 2,
    label: "Monitor",
  },
];

export const statusType = {
  1: "Scheduled",
  2: "Confirmed",
  3: "Waiting",
  4: "Visited",
  5: "Canceled",
};

export const statusOptions = [
  {
    value: 1,
    label: "Visited",
  },
  {
    value: 2,
    label: "Scheduled",
  },
  {
    value: 3,
    label: "Waiting",
  },
];
