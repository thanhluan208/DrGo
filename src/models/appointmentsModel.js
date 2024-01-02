import dayjs from "dayjs";
import { schedulerTypes } from "../constants/options";

class appointmentModel {
  static parseCreateAppointment(payload) {
    const { endDate, startDate } = payload;

    if (!endDate || !startDate) throw new Error("Missing required fields");

    return {
      id: Math.floor(Math.random() * 1000),
      ...payload,
      endDate: endDate.toDate(),
      startDate: startDate.toDate(),
    };
  }

  static parseRequestCreateAppointment(payload) {
    return {
      startDate: payload.startDate.valueOf(),
      endDate: payload.endDate.valueOf(),
      patientName: payload.patientName,
      insurance: payload.insurance,
      visitedBefore: payload.visitedBefore,
      type: payload.type || schedulerTypes[0].value,
      doctor: payload.doctor,
      symptoms: payload.symptoms,
      createdBy: payload.createdBy,
      status: payload.status,
    };
  }

  static parseResponseAppointment(response) {
    const parseResponse = response.map((item) => {
      return {
        createdBy: item.createdBy,
        doctor: item.doctor,
        endDate: dayjs(item.endDate).toDate(),
        id: item.id,
        insurance: item.insurance,
        patientName: item.patientName,
        startDate: dayjs(item.startDate).toDate(),
        type: item.type || schedulerTypes[0].value,
        status: item.status,
        symptoms: item.symptoms,
        visitedBefore: item.visitedBefore,
      };
    });

    return parseResponse;
    m;
  }
}

export default appointmentModel;
