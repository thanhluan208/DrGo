import dayjs from "dayjs";

class schedulesModel {
  static parseRequestActionSchedule(req) {
    const { startDate, endDate, startTime, endTime, repeatOn } = req;

    return {
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
      repeatOn,
    };
  }
}

export default schedulesModel;
