import React from "react";
import CommonStyles from "../../../components/CommonStyles";
import { useTheme } from "@emotion/react";
import Calendar from "../../../assets/icons/Calendar";
import List from "../../../assets/icons/List";
import AppointmentActionDialog from "../../../components/CommonStyles/Scheduler/components/AppointmentActionDialog";
import { useTranslation } from "react-i18next";
import { useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import { layoutTypes } from "..";

const options = [
  {
    value: "primaryCare",
    label: "Primary Care",
  },
  {
    value: "urgentCare",
    label: "Urgent Care",
  },
  {
    value: "specialist",
    label: "Specialist",
  },
  {
    value: "emergency",
    label: "Emergency",
  },
];

const Switcher = ({ renderLeft, renderRight, onClickRight, onClickLeft }) => {
  //! State
  const theme = useTheme();
  const [isActive, setIsActive] = React.useState("left");

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        borderRadius: "4px",
        overflow: "hidden",
        border: `1px solid ${theme.colors.custom.borderColor}`,
      }}
    >
      <CommonStyles.IconButton
        shouldHasNoti={false}
        customSx={{
          borderRadius: "4px 0 0 4px",
          backgroundColor:
            isActive === "left"
              ? theme.colors.custom.switcherActive
              : "transparent",
        }}
        onClick={() => {
          setIsActive("left");
          onClickLeft && onClickLeft();
        }}
      >
        {renderLeft && renderLeft()}
      </CommonStyles.IconButton>
      <CommonStyles.IconButton
        shouldHasNoti={false}
        customSx={{
          borderRadius: "0 4px 4px 0",
          backgroundColor:
            isActive === "right"
              ? theme.colors.custom.switcherActive
              : "transparent",
        }}
        onClick={() => {
          setIsActive("right");
          onClickRight && onClickRight();
        }}
      >
        {renderRight && renderRight()}
      </CommonStyles.IconButton>
    </CommonStyles.Box>
  );
};

const RightSettings = () => {
  //! State
  const { t } = useTranslation();
  const save = useSave();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        display: "flex",
        gap: "8px",
      }}
    >
      <Switcher
        renderLeft={() => {
          return <Calendar />;
        }}
        renderRight={() => {
          return <List />;
        }}
        onClickLeft={() => {
          save(cachedKeys.LAYOUT_TYPE_APPOINTMENT, layoutTypes.SCHEDULER);
        }}
        onClickRight={() => {
          save(cachedKeys.LAYOUT_TYPE_APPOINTMENT, layoutTypes.TABLE);
        }}
      />

      <Switcher
        renderLeft={() => {
          return (
            <CommonStyles.Typography type="normal14">
              {t("day")}
            </CommonStyles.Typography>
          );
        }}
        renderRight={() => {
          return (
            <CommonStyles.Typography type="normal14">
              {t("week")}
            </CommonStyles.Typography>
          );
        }}
      />

      <CommonStyles.Select
        options={options}
        defaultValue="primaryCare"
        sx={{
          paddingRight: "12px",
        }}
      />

      <AppointmentActionDialog />
    </CommonStyles.Box>
  );
};

export default RightSettings;
