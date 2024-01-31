import React, { useEffect } from "react";
import CommonStyles from "../../../components/CommonStyles";
import Edit from "../../../assets/icons/Edit";
import Delete from "../../../assets/icons/Delete";
import useFilter from "../../../hooks/useFilter";
import useGetListAppointment from "../../../hooks/appointments/useGetListAppointment";
import ButtonEditAppointment from "./ButtonEditAppointment";
import { tableType } from "../../../components/CommonStyles/Table";
import SelectStatus from "./SelectStatus";
import { useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";

const columns = [
  {
    id: "name",
    title: "Name",
    width: 200,
    renderContent: (props) => {
      const { name } = props;
      return (
        <CommonStyles.Tooltip title={name}>
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                width: 150,
                overflow: "hidden",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "status",
    title: "Status",
    width: 200,
    renderContent: (props) => {
      const { status } = props;
      return <SelectStatus data={props} />;
    },
  },
  {
    id: "contact",
    title: "Contact",
    width: 241,
  },
  {
    id: "date",
    title: "Date",
    width: 96,
  },
  {
    id: "visitTime",
    title: "Visit Time",
    width: 118,
  },
  {
    id: "doctor",
    title: "Doctor",
    width: 200,
    renderContent: (props) => {
      const { doctor } = props;
      return (
        <CommonStyles.Typography type="normal14">
          {doctor?.name}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "symptoms",
    title: "Symptoms",
  },
  {
    id: "action",
    title: "",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          centered
          sx={{
            display: "flex",
            gap: "12px",
            width: "100%",
          }}
        >
          <ButtonEditAppointment data={props} />
          <CommonStyles.IconButton>
            <CommonStyles.Box sx={{ padding: "8px" }}>
              <Delete />
            </CommonStyles.Box>
          </CommonStyles.IconButton>
        </CommonStyles.Box>
      );
    },
  },
];

const TableAppointments = () => {
  //! State
  const save = useSave();
  const { filters } = useFilter({
    currentPage: 1,
    pageSize: 100,
  });

  const {
    data: listAppointment,
    isLoading: loadingListAppointment,
    error,
    refetch: refetchListAppointment,
  } = useGetListAppointment(filters);

  console.log("listApp", listAppointment);

  //! Function

  useEffect(() => {
    save(
      cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT,
      refetchListAppointment
    );
  }, [refetchListAppointment]);

  //! Render
  return (
    <CommonStyles.Card>
      <CommonStyles.Table
        columns={columns}
        data={listAppointment}
        disabledCheckboxHeader
        maxHeight="500px"
        totalPage={3}
        filters={filters}
        loading={loadingListAppointment}
        type={tableType.BORDER}
        tableWidth={1500}
      />
    </CommonStyles.Card>
  );
};

export default TableAppointments;
