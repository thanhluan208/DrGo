import React, { Fragment, useMemo } from "react";
import useToggleDialog from "../../../hooks/useToggleDialog";
import CommonStyles from "../../../components/CommonStyles";
import DialogContent from "./DialogContent";
import Edit from "../../../assets/icons/Edit";
import dayjs from "dayjs";

const ButtonEditAppointment = ({ data }) => {
  //! State
  const { open, toggle, shouldRender } = useToggleDialog();

  const dialogData = useMemo(() => {
    return {
      ...data,
      doctor: data?.doctor?.id,
      date: dayjs(data?.date, "DD/MM/YYYY"),
      timeFrom: dayjs(data?.startDate),
      timeTo: dayjs(data?.endDate),
    };
  }, []);

  //! Function

  //! Render

  return (
    <Fragment>
      <CommonStyles.IconButton onClick={toggle}>
        <CommonStyles.Box sx={{ padding: "8px" }}>
          <Edit />
        </CommonStyles.Box>
      </CommonStyles.IconButton>
      {shouldRender && (
        <CommonStyles.Dialog
          handleClose={toggle}
          open={open}
          dialogContent={<DialogContent data={dialogData} toggle={toggle} />}
        />
      )}
    </Fragment>
  );
};

export default ButtonEditAppointment;
