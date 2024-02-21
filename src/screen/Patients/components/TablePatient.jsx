import React, { useEffect } from "react";
import CommonStyles from "../../../components/CommonStyles";
import { isEmpty } from "lodash";
import useGetAllPatient from "../../../hooks/patients/useGetAllPatients";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import { tableType } from "../../../components/CommonStyles/Table";
import { useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ActiveSwitch from "./ActiveSwitch";

const columns = [
  {
    id: "name",
    title: "Name",
    width: 220,
    renderContent: (props) => {
      const { name } = props;
      return (
        <CommonStyles.Tooltip title={name} placement="bottom-start">
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                width: 200,
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
    id: "email",
    title: "Email",
  },
  {
    id: "phone_number",
    title: "Phone Number",
  },
  {
    id: "is_employee",
    title: "Is Employee",
    renderContent: (props) => {
      const { is_employee } = props;
      return (
        <CommonStyles.Typography type="normal14">
          {is_employee ? (
            <CheckBoxIcon
              sx={{
                color: "green",
              }}
            />
          ) : (
            <CloseIcon
              sx={{
                color: "red",
              }}
            />
          )}
        </CommonStyles.Typography>
      );
    },
  },
  {
    id: "is_active",
    title: "Active",
    renderContent: (props) => {
      const { is_active, name, id } = props;

      return <ActiveSwitch id={id} isActive={is_active} patientName={name} />;
    },
  },
  {
    id: "action",
    title: "Actions",
    renderContent: (props) => {
      return (
        <CommonStyles.Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "16px",
          }}
        >
          <EditButton data={props} />
          <DeleteButton id={props?.id} />
        </CommonStyles.Box>
      );
    },
  },
];

const TablePatient = () => {
  //! State
  const { data, isLoading, refetch } = useGetAllPatient();
  const save = useSave();

  //! Function
  useEffect(() => {
    save(cachedKeys.PATIENT.REFETCH_LIST_PATIENT, refetch);
  }, []);

  //! Render

  return (
    <CommonStyles.Card>
      {isEmpty(data) && !isLoading ? (
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
          data={data || []}
          disabledCheckboxHeader
          disabledPagination
          maxHeight="500px"
          loading={isLoading}
          type={tableType.BORDER}
        />
      )}
    </CommonStyles.Card>
  );
};

export default TablePatient;
