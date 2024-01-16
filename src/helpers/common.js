import { cloneDeep, isArray } from "lodash";

export const localStorageFunc =
  typeof window !== "undefined" ? window.localStorage : undefined;

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertdoctorToOptions = (doctor) => {
  if (!isArray(doctor)) return [];
  const options = [];
  doctor.forEach((item) => {
    const parsedItem = JSON.parse(item.text);
    options.push({
      value: item.id,
      label: parsedItem.name,
    });
  });

  return options;
};

export const convertPatientToOptions = (patient) => {
  if (!isArray(patient)) return [];

  const options = [];
  patient.forEach((item) => {
    options.push({
      value: item.id,
      label: item?.name || `Patient ${item.id}`,
    });
  });

  return options;
};

export const convertResponseToOptions = (
  response,
  fieldOfValue,
  fieldOfLabel
) => {
  const nextResponse = cloneDeep(response);
  if (!isArray(nextResponse) || !fieldOfLabel || !fieldOfValue) return [];
  const options = [];
  response.map((item) => {
    options.push({
      ...item,
      value: item[fieldOfValue],
      label: item[fieldOfLabel] || item[fieldOfValue],
    });
  });

  console.log("options", options);
  return options;
};
