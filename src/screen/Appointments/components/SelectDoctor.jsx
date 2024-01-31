import React, { memo, useCallback, useEffect, useMemo } from "react";
import { FastField, Field } from "formik";
import { MenuItem } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import cachedKeys from "../../../constants/cachedKeys";
import CustomFields from "../../../components/CustomFields";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";

const SelectDoctor = ({ readOnly }) => {
  //! State
  const { data } = useGetListDoctor();

  const options = useMemo(() => {
    if (isEmpty(data)) return [];
    const nextData = cloneDeep(data).map((elm) => {
      return {
        ...elm,
        label: elm.name,
        value: elm.id,
      };
    });

    return nextData;
  }, [data]);
  //! Function

  console.log("options", options);

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
    <Field
      name="doctor"
      component={CustomFields.SelectField}
      options={options}
      fullWidth
      disabled={readOnly}
      label="Doctor"
      required
      renderOptions={renderOptions}
    />
  );
};

export default memo(SelectDoctor);
