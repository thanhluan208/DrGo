import React, { Fragment, useState } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "../../../components/CommonStyles";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Delete from "../../../assets/icons/Delete";
import FirebaseServices from "../../../services/firebaseServices";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";

const DeleteButton = ({ id }) => {
  //! State
  const { open, shouldRender, toggle } = useToggleDialog();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const refetchListPatient = useGet(cachedKeys.PATIENT.REFETCH_LIST_PATIENT);

  //! Function
  const handleDeletePatient = async () => {
    setLoading(true);
    const toastId = toast.loading("Deleting patient...", {
      isLoading: true,
      autoClose: false,
    });

    try {
      await FirebaseServices.deletePatient(id);

      await refetchListPatient();

      toast.update(toastId, {
        render: "Delete patient successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      toggle();
    } catch (error) {
      setLoading(false);
      toast.update(toastId, {
        render: "Error when deleting patient",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  //! Render

  return (
    <Fragment>
      <CommonStyles.IconButton onClick={toggle}>
        <Delete />
      </CommonStyles.IconButton>
      {shouldRender && (
        <CommonStyles.Dialog
          open={open}
          handleClose={toggle}
          dialogContent={
            <CommonStyles.ConfirmDialog
              loading={loading}
              toggle={toggle}
              open={open}
              confirmCallback={handleDeletePatient}
              title={"Confirm delete patient"}
              content={"Are you sure you want to delete this patient?"}
            />
          }
        />
      )}
    </Fragment>
  );
};

export default DeleteButton;
