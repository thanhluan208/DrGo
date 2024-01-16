import React from "react";
import CommonStyles from "../../components/CommonStyles";

const Fallback = (props) => {
  return (
    <CommonStyles.Box>
      <CommonStyles.Typography type="bold18">
        Something went wrong !
      </CommonStyles.Typography>
      <CommonStyles.Typography type="normal12">
        Please try again later
      </CommonStyles.Typography>

      <CommonStyles.Typography type="normal12">
        {props?.error?.message}\n{props?.error?.stack}
      </CommonStyles.Typography>
      <CommonStyles.Typography type="normal12">
        {props?.errorInfo?.componentStack}
      </CommonStyles.Typography>

      <CommonStyles.Button
        onClick={() => {
          window.location.reload();
        }}
        sx={{ marginTop: "20px" }}
      >
        Reload
      </CommonStyles.Button>
    </CommonStyles.Box>
  );
};

export default Fallback;
