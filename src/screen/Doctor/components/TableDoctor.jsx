import React, { useEffect } from "react";
import CommonStyles from "../../../components/CommonStyles";
import useGetListDoctor from "../../../hooks/appointments/useGetListDoctor";
import { isEmpty } from "lodash";
import { tableType } from "../../../components/CommonStyles/Table";
import EditButton from "./EditButton";
import { useSave } from "../../../stores/useStores";
import cachedKeys from "../../../constants/cachedKeys";
import Delete from "../../../assets/icons/Delete";
import i18n from "../../../../i18n";
import DeleteButton from "./DeleteButton";

const columns = [
  {
    id: "name",
    title: "Name",
    width: 200,
    renderContent: (props) => {
      const { name } = props;
      return (
        <CommonStyles.Tooltip title={name} placement="bottom-start">
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
    id: "email",
    title: "Email",
    width: 200,
  },
  {
    id: "location",
    title: "Location",
    width: 100,
  },
  {
    id: "description",
    title: "Description",
    renderContent: (props) => {
      const { description } = props;
      return (
        <CommonStyles.Tooltip title={description} placement="bottom-start">
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                width: 250,
                overflow: "hidden",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {description}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "about",
    title: "About",
    width: 600,
    renderContent: (props) => {
      const { about } = props;
      return (
        <CommonStyles.Tooltip title={about} placement="bottom-start">
          <div>
            <CommonStyles.Typography
              type="normal14"
              sx={{
                width: 500,
                overflow: "hidden",
                textWrap: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {about}
            </CommonStyles.Typography>
          </div>
        </CommonStyles.Tooltip>
      );
    },
  },
  {
    id: "action",
    title: "Action",
    width: 100,
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

const TableDoctor = () => {
  //! State
  const { data, isLoading, refetch } = useGetListDoctor();
  const save = useSave();

  //! Function
  useEffect(() => {
    save(cachedKeys.DOCTOR.REFETCH_LIST_DOCTOR, refetch);
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
          tableWidth={1500}
        />
      )}
    </CommonStyles.Card>
  );
};

export default TableDoctor;
