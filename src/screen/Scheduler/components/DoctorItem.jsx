import React from "react";
import CommonStyles from "../../../components/CommonStyles";
import { useNavigate } from "react-router-dom";
import routes from "../../../constants/route";

const DoctorItem = ({ doctor }) => {
  //! State
  const { avatar, name, description, id } = doctor;
  const navigate = useNavigate();

  //! Function
  const handleSelectDoctor = () => {
    navigate(`${routes.doctorSchedule}/${id}`);
  };

  //! Render
  return (
    <CommonStyles.Button
      onClick={handleSelectDoctor}
      variant="text"
      sx={{
        display: "flex",
        gap: "20px",
        justifyContent: "flex-start",
        textAlign: "unset",
        // width: "fit-content",
      }}
    >
      <CommonStyles.Avatar src={avatar} />
      <CommonStyles.Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CommonStyles.Typography
          type="bold12"
          sx={{
            color: "#000",
          }}
        >
          {name}
        </CommonStyles.Typography>
        <CommonStyles.Typography
          type="normal12"
          sx={{
            color: "#606C80",
          }}
        >
          {description}
        </CommonStyles.Typography>
      </CommonStyles.Box>
    </CommonStyles.Button>
  );
};

export default DoctorItem;
