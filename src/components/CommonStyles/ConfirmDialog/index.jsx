import React, { Fragment } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "..";

const ConfirmDialog = ({
  customButton,
  title,
  content,
  open,
  toggle,
  shouldRender,
}) => {
  //! State

  //! Function

  //! Render

  return (
    <Fragment>
      {customButton ? (
        customButton
      ) : (
        <CommonStyles.IconButton onClick={toggle}>Open</CommonStyles.IconButton>
      )}
      {shouldRender && (
        <CommonStyles.Dialog
          handleClose={toggle}
          open={open}
          title={title || "Confirm"}
          content={content || "Are you sure?"}
        />
      )}
    </Fragment>
  );
};

export default ConfirmDialog;
