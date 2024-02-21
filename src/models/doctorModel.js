class doctorModel {
  static parseResponseDoctorList(response) {
    if (!response) return [];

    return response.map((item) => {
      return {
        id: item.id,
        about: item.about,
        description: item.description,
        email: item.email,
        name: item.name,
        insurance: item.insurance,
        location: item.location,
      };
    });
  }
}

export default doctorModel;
