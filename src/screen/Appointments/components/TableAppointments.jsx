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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import routes from "../../../constants/route";
import ButtonCreateAppointment from "./ButtonCreateAppointment";
import StatusCard from "../../Home/components/StatusCard";
import ActionStatus from "./ActionStatus";
import { isEmpty } from "lodash";
import { CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SelectDoctor from "./SelectDoctor";
import SelectDoctorWithoutFormik from "./SelectDoctorWithoutFormik";
import Option from "../../../assets/icons/Option";

const columns = [
  {
    id: "name",
    title: "Name",
    renderContent: (props) => {
      const { id } = props;
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
              {id}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "date",
    title: "Date",
  },
  {
    id: "visitTime",
    title: "Visit Time",
    renderContent: (props) => {
      const { visitTime } = props;
      if (!visitTime)
        return <StatusCard status={"declined"} content={"Unassigned"} />;

      return (
        <CommonStyles.Typography type="normal14">
          {visitTime}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "doctor",
    title: "Doctor",
    width: 200,
    renderContent: (props) => {
      const { doctor } = props;
      if (!doctor)
        return <StatusCard status={"declined"} content={"Unassigned"} />;
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
    id: "action/status",
    title: "Actions/Status",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          sx={{
            display: "flex",
            justifyContent: "start",
            width: "260px",
          }}
        >
          <ActionStatus data={props} />
        </CommonStyles.Box>
      );
    },
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
            width: "100%",
          }}
        >
          {/* <ButtonEditAppointment data={props} /> */}
          <CommonStyles.IconButton>
            <CommonStyles.Box sx={{ padding: "8px" }}>
              <Option />
            </CommonStyles.Box>
          </CommonStyles.IconButton>
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

const tabOption = {
  1: "All",
  2: "Pending",
  3: "Confirmed",
};

const TableAppointments = () => {
  //! State
  const save = useSave();
  const navigate = useNavigate();
  const params = queryString.parse(useLocation()?.search);

  const { tab } = params || {};

  const { filters, handleChangePage, setFilters } = useFilter({
    currentPage: 0,
    pageSize: 10,
    status: tabOption[tab]?.toLowerCase() || "all",
    date: new Date(),
    doctor: "",
  });

  const {
    data,
    isLoading: loadingListAppointment,
    error,
    refetch: refetchListAppointment,
  } = useGetListAppointment(filters);

  const { listAppointment, totalPage } = data || {};

  //! Function
  const handleChangeDoctor = (event) => {
    const value = event.target.value;

    setFilters((prev) => {
      return {
        ...prev,
        doctor: value,
      };
    });
  };

  useEffect(() => {
    save(
      cachedKeys.APPOINTMENTS.REFETCH_LIST_APPOINTMENT,
      refetchListAppointment
    );
  }, [refetchListAppointment]);

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        marginTop: "40px",
      }}
    >
      <CommonStyles.Box
        sx={{
          padding: "0 15px",
          display: "flex",
          gap: "18px",
          marginBottom: "31px",
        }}
      >
        {Object.entries(tabOption).map(([key, value]) => {
          const isActive = +tab === +key || (!tab && key === "1");
          return (
            <CommonStyles.Button
              key={`${key}-${value}`}
              variant="text"
              onClick={() => {
                navigate(`${routes.appointment}?tab=${key}`);
                setFilters((prev) => {
                  return {
                    ...prev,
                    status: value.toLowerCase(),
                  };
                });
              }}
            >
              <CommonStyles.Typography
                type="normal16"
                sx={{
                  color: isActive ? "#25282B" : "#A3A3A3",
                }}
              >
                {value}
              </CommonStyles.Typography>
            </CommonStyles.Button>
          );
        })}
      </CommonStyles.Box>
      <CommonStyles.Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dayjs(filters?.date)}
            format="MM/DD/YYYY"
            onChange={(newValue) =>
              setFilters((prev) => ({ ...prev, date: newValue }))
            }
            slotProps={{
              textField: {
                placeholder: "Select date",
                sx: {
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
                  width: 307,
                  fieldset: {
                    border: "none",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
        <SelectDoctorWithoutFormik
          value={filters?.doctor}
          onChange={handleChangeDoctor}
        />
      </CommonStyles.Box>
      <CommonStyles.Card>
        {isEmpty(listAppointment) && !loadingListAppointment ? (
          <CommonStyles.Box
            sx={{
              padding: "20px",
              display: "flex",
              gap: "20px",
            }}
          >
            <CommonStyles.Typography type="normal16">
              No appointment found
            </CommonStyles.Typography>
          </CommonStyles.Box>
        ) : (
          <CommonStyles.Table
            columns={columns}
            data={listAppointment || []}
            disabledCheckboxHeader={isEmpty(listAppointment)}
            maxHeight="500px"
            totalPage={totalPage}
            filters={filters}
            loading={loadingListAppointment}
            type={tableType.BORDER}
            tableWidth={1500}
            handleChangePage={handleChangePage}
          />
        )}
      </CommonStyles.Card>
    </CommonStyles.Box>
  );
};

export default TableAppointments;
