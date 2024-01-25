import React, { Fragment, useCallback } from "react";
import { appointmentActionTypes } from "../../../constants/type";
import CommonStyles from "../../../components/CommonStyles";
import Eyes from "../../../assets/icons/Eyes";
import EditPencil from "../../../assets/icons/EditPencil";

const CellActions = ({ type, ...otherProps }) => {
  //! State

  //! Function

  //! Render
  const renderButton = useCallback(() => {
    if (type === appointmentActionTypes.VIEW) {
      return (
        <CommonStyles.IconButton>
          <Eyes />
        </CommonStyles.IconButton>
      );
    }
    if (type === appointmentActionTypes.EDIT) {
      return (
        <CommonStyles.IconButton>
          <EditPencil />
        </CommonStyles.IconButton>
      );
    }
  }, [type]);

  return <Fragment>{renderButton()}</Fragment>;
};

export default CellActions;
