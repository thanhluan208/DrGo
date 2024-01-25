import * as React from "react";
import MUIDialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({ open, handleClose, dialogContent, ...otherProps }) => {
  //! State

  //! Function

  //! Render
  return (
    <MUIDialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      {...otherProps}
    >
      {dialogContent || "Placeholder..."}
    </MUIDialog>
  );
};

export default Dialog;
