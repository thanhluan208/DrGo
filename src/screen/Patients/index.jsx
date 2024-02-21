import React from "react";
import CommonStyles from "../../components/CommonStyles";
import CreateButton from "./components/CreateButton";
import TablePatient from "./components/TablePatient";

const Patient = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "0 40px",
        paddingBottom: "100px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <CommonStyles.Typography
          type="bold40"
          sx={{
            color: "#25282B",
          }}
        >
          Patient
        </CommonStyles.Typography>

        <CreateButton />
      </CommonStyles.Box>

      <TablePatient />
    </CommonStyles.Box>
  );
};

export default Patient;
