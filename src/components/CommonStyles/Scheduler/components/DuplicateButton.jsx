import React, { memo, useMemo } from "react";
import AppointmentActionDialog from "./AppointmentActionDialog";
import CommonStyles from "../..";
import { useTranslation } from "react-i18next";

const DuplicateButton = ({ data }) => {
  //! State
  const { t } = useTranslation();

  //! Function

  //! Render
  const renderButton = (toggle) => {
    return (
      <CommonStyles.Button variant="outlined" onClick={toggle}>
        <CommonStyles.Typography type="normal14">
          {t("duplicate")}
        </CommonStyles.Typography>
      </CommonStyles.Button>
    );
  };

  return (
    <AppointmentActionDialog
      customButton={renderButton}
      isDuplicate
      data={data}
    />
  );
};

export default memo(DuplicateButton);
