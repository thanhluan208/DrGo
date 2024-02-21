import React, { Fragment } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "../../../components/CommonStyles";
import Edit from "../../../assets/icons/Edit";
import DialogEditAndCreate from "../dialogs/DialogEditAndCreate";

const EditButton = ({ data }) => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();

  //! Function

  //! Render
  return (
    <Fragment>
      <CommonStyles.IconButton onClick={toggle}>
        <CommonStyles.Box sx={{ padding: "8px" }}>
          <Edit />
        </CommonStyles.Box>
      </CommonStyles.IconButton>
      {shouldRender && (
        <CommonStyles.Dialog
          handleClose={toggle}
          open={open}
          maxWidth="md"
          fullWidth
          dialogContent={<DialogEditAndCreate data={data} toggle={toggle} />}
        />
      )}
    </Fragment>
  );
};

export default EditButton;
