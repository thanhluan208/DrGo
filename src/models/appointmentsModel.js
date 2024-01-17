import dayjs from "dayjs";
import { schedulerTypes } from "../constants/options";

class appointmentModel {
  static parseRequestCreateAppointment(payload) {
    return {
      startDate: payload.startDate.toDate(),
      endDate: payload.endDate.toDate(),
      patient: payload.patient.id,
      insurance: payload?.insurance || null,
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
        createdBy: item?.createdBy,
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
      };
    });

    return parseResponse;
  }
}

export default appointmentModel;
