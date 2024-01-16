import React, { memo, useCallback } from "react";
import CustomFields from "../../../CustomFields";
import { cloneDeep, isArray } from "lodash";
import useGetAllDocs from "../../../../hooks/useGetAllDocs";
import { Field } from "formik";
import { MenuItem } from "@mui/material";
import CommonStyles from "../..";

const transformResponse = (response) => {
  return response.map((item) => {
    return {
      ...item,
      value: item.id,
      label: item.name,
    };
  });
};

const SelectInsurance = ({ readOnly }) => {
  //! State
  const { data, isLoading, error } = useGetAllDocs(
    "insurance",
    transformResponse
  );

  //! Function

  //! Render
  const renderOptions = useCallback((options) => {
    const nextOptions = cloneDeep(options);
    if (!isArray(nextOptions)) return null;

    return nextOptions.map((option) => {
      const { id, name, description, logo } = option;
      return (
        <MenuItem key={id} value={id}>
          <CommonStyles.Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 4fr",
              gridGap: "12px",
            }}
          >
            <CommonStyles.Box centered>
              <img src={logo} alt={name} style={{ width: "40px" }} />
            </CommonStyles.Box>
            <CommonStyles.Box
              centered
              sx={{ flexDirection: "column", alignItems: "start" }}
            >
              <CommonStyles.Typography type="bold14">
                {name}
              </CommonStyles.Typography>
              <CommonStyles.Typography type="normal12">
                {description}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          </CommonStyles.Box>
        </MenuItem>
      );
    });
  }, []);

  if (error) return <div>error</div>;

  return (
    <Field
      name="insurance"
      label="Insurance"
      component={CustomFields.SelectField}
      fullWidth
      disabled={readOnly}
      required
      options={data}
      renderOptions={renderOptions}
      loading={isLoading}
    />
  );
};

export default memo(SelectInsurance);
