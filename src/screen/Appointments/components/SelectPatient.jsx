import React, { memo, useCallback, useRef, useState } from "react";
import { FastField } from "formik";
import useGetListPatient from "../../../hooks/appointments/useGetListPatient";
import cachedKeys from "../../../constants/cachedKeys";
import CustomFields from "../../../components/CustomFields";
import CommonStyles from "../../../components/CommonStyles";

const SelectPatient = (props) => {
  //! State
  const { readOnly } = props;
  const deboundRef = useRef(null);
  const [filters, setFilters] = useState({
    patientName: "",
    page: 1,
    pageSize: 10,
  });
  const { isLoading, error, hasMore } = useGetListPatient(
    filters,
    cachedKeys.APPOINTMENTS.LIST_PATIENT
  );

  //! Function

  const infiniteScrollCallback = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilters((prev) => {
      return {
        ...prev,
        page: prev.page + 1,
      };
    });
  }, [hasMore, isLoading]);

  //! Open when search subString is available
  // const onInputChange = useCallback((event, value, type) => {
  //   if (deboundRef.current) {
  //     clearTimeout(deboundRef.current);
  //   }

  //   deboundRef.current = setTimeout(() => {
  //     setFilters((prev) => {
  //       return {
  //         ...prev,
  //         patientName: value,
  //         page: 1,
  //       };
  //     });
  //   }, 300);
  // }, []);

  //! Render
  if (error) return <div>error</div>;

  return (
    <CommonStyles.Box
      sx={{
        ".select-field": {
          padding: 0,
        },
      }}
    >
      <FastField
        name="patient"
        label="Patient name"
        component={CustomFields.AutoComplete}
        fullWidth
        required
        optionsKey={cachedKeys.APPOINTMENTS.LIST_PATIENT}
        loading={isLoading}
        disabled={readOnly}
        sx={{
          padding: 0,
        }}
        // onInputChange={onInputChange}
        infiniteScrollCallback={infiniteScrollCallback}
      />
    </CommonStyles.Box>
  );
};

export default memo(SelectPatient);
