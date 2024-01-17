import React, { memo, useCallback } from "react";
import CustomFields from "../../../CustomFields";
import { FastField } from "formik";
import cachedKeys from "../../../../constants/cachedKeys";
import { MenuItem } from "@mui/material";
import { cloneDeep } from "lodash";

const SelectDoctor = ({ readOnly }) => {
  //! State

  //! Function

  const convertDoctorToOptions = useCallback((doctorList) => {
    const nextDoctorList =
      cloneDeep(doctorList).map((elm) => {
        const parsedInfo = JSON.parse(elm.text);
        return {
          ...elm,
          label: parsedInfo.name,
          value: elm.id,
        };
      }) || [];

    return nextDoctorList;
  }, []);

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
    <FastField
      name="doctor"
      component={CustomFields.SelectField}
      optionsKey={cachedKeys.APPOINTMENTS.LIST_DOCTOR}
      convertOptionCallback={convertDoctorToOptions}
      fullWidth
      disabled={readOnly}
      label="Doctor"
      required
      renderOptions={renderOptions}
    />
  );
};

export default memo(SelectDoctor);
