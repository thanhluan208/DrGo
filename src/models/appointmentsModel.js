import dayjs from "dayjs";
import { schedulerTypes } from "../constants/options";

class appointmentModel {
  static parseRequestCreateAppointment(payload) {
    const { doctor, patient, email, number, status, injure } = payload;
    const startDate = dayjs(payload?.date)
      .set("hour", dayjs(payload?.timeFrom).format("HH"))
      .set("minute", dayjs(payload?.timeFrom).format("mm"))
      .toDate();

    const endDate = dayjs(payload?.data)
      .set("hour", dayjs(payload?.timeTo).format("HH"))
      .set("minute", dayjs(payload?.timeTo).format("mm"))
      .toDate();
    return {
      startDate,
      endDate,
      doctor,
      patient: patient?.id,
      email,
      number,
      status,
      symptoms: injure,
    };
  }

  static parseResponseAppointment(response) {
    const parseResponse = response.map((item) => {
      const visitTime = `${dayjs(item?.startDate.toDate()).format(
        "HH:mm"
      )}-${dayjs(item?.endDate.toDate()).format("HH:mm")}`;
      return {
        name: item?.patient?.name || `Patient ${item?.patient?.id}`,
        doctor: item?.doctor,
        endDate: item?.endDate.toDate(),
        id: item?.id,
        insurance: item?.insurance,
        patient: item?.patient,
        startDate: item?.startDate.toDate(),
        type: item?.type || schedulerTypes[0].value,
        status: item?.status,
        symptoms: item?.symptoms,
        visitedBefore: item?.visitedBefore,
        contact: `${item?.email ? item?.email : ""} ${
          item?.number ? ` - ${item?.number}` : ""
        }`,
        visitTime,
        date: dayjs(item?.startDate.toDate()).format("DD/MM/YYYY"),
      };
    });

    return parseResponse;
  }
}

export default appointmentModel;
