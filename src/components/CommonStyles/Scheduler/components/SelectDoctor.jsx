import React, { memo, useCallback, useMemo } from "react";
import { convertdoctorToOptions } from "../../../../helpers/common";
import CustomFields from "../../../CustomFields";
import { Field } from "formik";
import cachedKeys from "../../../../constants/cachedKeys";
import { useGet } from "../../../../stores/useStores";
import { MenuItem } from "@mui/material";

const SelectDoctor = ({ readOnly }) => {
  //! State
  const listDoctor = useGet(cachedKeys.APPOINTMENTS.LIST_DOCTOR);
  const doctorOptions = useMemo(() => {
    return convertdoctorToOptions(listDoctor);
  }, [listDoctor]);

  //! Function

  //! Render
  const renderOptions = useCallback((options) => {
    if (!options) return null;
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  }, []);

  return (
    <Field
      name="doctor"
      component={CustomFields.SelectField}
      options={doctorOptions}
      fullWidth
      disabled={readOnly}
      label="Doctor"
      required
      renderOptions={renderOptions}
    />
  );
};

export default memo(SelectDoctor);
