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
}

export default appointmentModel;
