import React, { memo, useCallback, useEffect, useMemo } from "react";
import { FastField, Field, useFormikContext } from "formik";
import { MenuItem } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import cachedKeys from "../../../constants/cachedKeys";
import CustomFields from "../../../components/CustomFields";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";

const SelectDoctor = ({ readOnly }) => {
  //! State
  const { data, isLoading } = useGetListDoctor();
  const { setFieldValue } = useFormikContext();

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
  const isOptionEqualToValue = useCallback((option, value) => {
    return value?.id || "";
  }, []);

  const onChangeCustomize = (value) => {
    const doctorSelected = data.find((elm) => elm.id === value);
    setFieldValue("doctor", doctorSelected);
  };

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
      disabled={readOnly || isLoading}
      label="Doctor"
      required
      renderOptions={renderOptions}
      loading={isLoading}
      isOptionEqualToValue={isOptionEqualToValue}
      onChangeCustomize={onChangeCustomize}
    />
  );
};

export default memo(SelectDoctor);
