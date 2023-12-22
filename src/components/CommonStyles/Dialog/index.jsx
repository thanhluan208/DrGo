import * as React from "react";
import Button from "@mui/material/Button";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = ({
  open,
  handleClose,
  content,
  title,
  Actions,
  ...otherProps
}) => {
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
      <DialogTitle>
        {title ? title : "Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        {content ? (
          content
        ) : (
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {Actions ? (
          <Actions handleClose={handleClose} />
        ) : (
          <Button onClick={handleClose}>Disagree</Button>
        )}
      </DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
