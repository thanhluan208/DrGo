import React, { Fragment, useRef, useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Edit from "../../../assets/icons/Edit";
import Assign from "../../../assets/icons/Assign";
import { ButtonType } from "../../../components/CommonStyles/Button";
import useToggleDialog from "../../../hooks/useToggleDialog";
import AssignDialogContent from "./AssignDialogContent";

const ButtonAssign = ({ data }) => {
  //! State
  const [loading, setLoading] = useState(false);
  const {
    open: openAssignDialog,
    toggle: toggleAssignDialog,
    shouldRender: shouldRenderAssignDialog,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.Button
        loading={loading}
        onClick={toggleAssignDialog}
        sx={{
          display: "flex",
          gap: "5px",
          padding: "5px 20px 5px 15px",
          background: "#2AD075",
          borderRadius: "50px",
          "&:hover": {
            background: "#2AD075",
          },
        }}
      >
        <Assign />
        <CommonStyles.Typography
          type="normal14"
          sx={{
            color: "#fff",
          }}
        >
          Assign
        </CommonStyles.Typography>
      </CommonStyles.Button>
      {shouldRenderAssignDialog && (
        <CommonStyles.Dialog
          open={openAssignDialog}
          handleClose={toggleAssignDialog}
          dialogContent={
            <AssignDialogContent
              toggle={toggleAssignDialog}
              data={data}
              setLoading={setLoading}
            />
          }
        />
      )}
    </Fragment>
  );
};

export default ButtonAssign;
