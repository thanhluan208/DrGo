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

  static parseRequestAssignAppointment = (body) => {
    const { timeFrom, timeTo, doctor } = body;
    const visitTime = `${dayjs(timeFrom).format("hh:mm")} - ${dayjs(
      timeTo
    ).format("hh:mma")}`;

    return {
      doctor: doctor?.id,
      status: "confirmed",
      visit_time: visitTime,
    };
  };

  static parseResponseAppointment(response) {
    const parseResponse = response.map((item) => {
      return {
        name: item?.patient?.name || `Patient ${item?.patient?.id}`,
        doctor: item?.doctor,
        endDate: item?.endDate.toDate(),
        id: item?.id,
        // insurance: item?.insurance,
        patient: item?.patient,
        startDate: item?.startDate.toDate(),
        status: item?.status,
        symptoms: item?.symptoms,
        visitTime: item?.visit_time,
        date: dayjs(item?.startDate.toDate()).format("MM/DD/YYYY"),
      };
    });

    return parseResponse;
  }
}

export default appointmentModel;
