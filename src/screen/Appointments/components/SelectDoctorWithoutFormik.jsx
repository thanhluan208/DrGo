import React, { memo, useCallback, useEffect, useMemo } from "react";
import { FastField, Field, useFormikContext } from "formik";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import cachedKeys from "../../../constants/cachedKeys";
import CustomFields from "../../../components/CustomFields";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";
import CommonStyles from "../../../components/CommonStyles";

const SelectDoctor = ({ readOnly, onChange, value }) => {
  //! State
  const { data, isLoading } = useGetListDoctor();

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

  //! Render

  return (
    <CommonStyles.Box
      centered
      sx={{
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
      }}
    >
      <CommonStyles.Box
        centered
        sx={{
          padding: "0 24px",
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          height: "100%",
          background: "#F1F1F1",
        }}
      >
        <CommonStyles.Typography
          type="normal14"
          sx={{
            color: "#25282B",
            fontWeight: 600,
          }}
        >
          Doctor
        </CommonStyles.Typography>
      </CommonStyles.Box>
      <CommonStyles.Select
        options={options}
        value={value}
        onChange={onChange}
        defaultValue={"Select doctor"}
        sx={{
          background: "#fff",
          width: 300,
          borderRadius: "0px 8px 8px 0px",
          fieldset: {
            border: "none",
          },
        }}
      />
    </CommonStyles.Box>
  );
};

export default memo(SelectDoctor);
