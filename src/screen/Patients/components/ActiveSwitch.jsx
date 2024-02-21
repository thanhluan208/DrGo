import { CircularProgress, Switch } from "@mui/material";
import React, { useState } from "react";
import CommonStyles from "../../../components/CommonStyles";
import { toast } from "react-toastify";
import FirebaseServices from "../../../services/firebaseServices";
import { useGet } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";

const ActiveSwitch = ({ id, isActive, patientName, ...otherProps }) => {
  //! State
  console.log("isActive", isActive);

  const [loading, setLoading] = useState(false);
  const refetchListPatient = useGet(cachedKeys.PATIENT.REFETCH_LIST_PATIENT);

  //! Function
  const handleChange = async (event, checked) => {
    setLoading(true);

    console.log("checked", checked);
    const toastId = toast.loading(`Updating ${patientName}'s active status`, {
      isLoading: true,
      autoClose: false,
    });

    try {
      await FirebaseServices.updatePatient(id, {
        is_active: checked,
      });

      await refetchListPatient();

      toast.update(toastId, {
        render: `Updated ${patientName}'s active status successfully`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setLoading(false);
    } catch (error) {
      console.log("er", error);
      toast.update(toastId, {
        render: `Updated ${patientName}'s active status failed`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      setLoading(false);
    }
  };

  //! Render
  return (
    <CommonStyles.Box
      centered
      sx={{
        gap: "12px",
      }}
    >
      <Switch
        value={isActive}
        checked={isActive}
        defaultChecked={isActive}
        onChange={handleChange}
        disabled={loading}
        {...otherProps}
      />
      {loading && <CircularProgress size="16px" />}
    </CommonStyles.Box>
  );
};

export default ActiveSwitch;
