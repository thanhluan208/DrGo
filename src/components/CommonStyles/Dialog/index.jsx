import * as React from "react";
import MUIDialog from "@mui/material/Dialog";

import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({
  open,
  handleClose,
  disabledBackdropClose,
  dialogContent,
  ...otherProps
}) => {
  //! State

  //! Function

  //! Render
  return (
    <MUIDialog
      open={open}
      TransitionComponent={Transition}
      onClose={(e, reason) => {
        if (reason !== "backdropClick" || !disabledBackdropClose) {
          handleClose(e);
        }
      }}
      aria-describedby="alert-dialog-slide-description"
      {...otherProps}
    >
      {dialogContent || "Placeholder..."}
    </MUIDialog>
  );
};

export default Dialog;
