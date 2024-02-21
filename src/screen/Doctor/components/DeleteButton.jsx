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

  const refetchListDoctor = useGet(cachedKeys.DOCTOR.REFETCH_LIST_DOCTOR);

  //! Function
  const handleDeleteDoctor = async () => {
    setLoading(true);
    const toastId = toast.loading(t("doctor.deleting"), {
      isLoading: true,
      autoClose: false,
    });

    try {
      await FirebaseServices.deleteDoctor(id);

      await refetchListDoctor();

      toast.update(toastId, {
        render: t("doctor.deleteSuccessfully"),
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setLoading(false);
      toggle();
    } catch (error) {
      setLoading(false);
      toast.update(toastId, {
        render: t("doctor.actionDoctorFailed"),
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
              confirmCallback={handleDeleteDoctor}
              content={t("doctor.confirmDelete")}
              title={t("doctor.confirmDeleteTitle")}
            />
          }
        />
      )}
    </Fragment>
  );
};

export default DeleteButton;
