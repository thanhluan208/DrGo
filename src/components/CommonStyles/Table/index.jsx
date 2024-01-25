import React, { useMemo } from "react";
import CommonStyles from "..";
import PerfectScrollBar from "react-perfect-scrollbar";
import TableHeader from "./Components/TableHeader";
import TableContent from "./Components/TableContent";
import { useTheme } from "@emotion/react";
import Pagination from "./Components/Pagination";
import { CircularProgress } from "@mui/material";

const Table = ({
  data,
  columns,
  hasCheckbox,
  disabledCheckboxHeader,
  filters,
  handleChangeSort,
  tableWidth,
  maxHeight = "600px",
  maxWidth,
  handleSelectRow,
  headerLevel = 1,
  handleSelectAll,
  totalPage,
  handleChangePage,
  handleChangePageSize,
  disabledPagination,
  loading,
}) => {
  //! State
  const { sortBy, sortDirection, selectedRows, currentPage, pageSize } =
    filters || {};

  const theme = useTheme();
  const calculateTemplate = useMemo(() => {
    let template = hasCheckbox ? "80px" : "";

    columns.forEach((item) => {
      if (item.width && item.width > 0) {
        template += " " + item.width + "px";
      } else {
        template += " 1fr";
      }
    });

    return template;
  }, [columns, hasCheckbox]);

  //! Function

  //! Render

  return (
    <CommonStyles.Box>
      <PerfectScrollBar
        style={{ maxWidth: maxWidth, overflow: "unset !important" }}
      >
        <TableHeader
          columns={columns}
          data={data}
          handleChangeSort={handleChangeSort}
          hasCheckbox={hasCheckbox}
          sortBy={sortBy}
          sortDirection={sortDirection}
          calculateTemplate={calculateTemplate}
          headerLevel={headerLevel}
          tableWidth={tableWidth}
          disabledCheckboxHeader={disabledCheckboxHeader}
          selectedRows={selectedRows}
          handleSelectAll={handleSelectAll}
        />

        {loading ? (
          <CommonStyles.Box
            sx={{
              width: !!tableWidth ? tableWidth : "100%",
              height: 640,
              background: "rgba(0,0,0,0.2)",
            }}
            centered
          >
            <CircularProgress />
          </CommonStyles.Box>
        ) : (
          <CommonStyles.Box
            sx={{
              minWidth: "100%",
              width: !!tableWidth ? tableWidth : "100%",
              borderRadius: "12px",
            }}
          >
            <CommonStyles.Box
              sx={{
                // ".scrollbar-container": {
                //   overflow: "unset !important",
                // },
                // ".ps__thumb-y": {
                //   display: "none !important",
                // },
                borderRadius: "12px",
                // boxShadow: "0px 2px 6px rgba(100, 116, 139, 0.12)",
                // border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <PerfectScrollBar
                style={{
                  maxHeight: `${maxHeight} `,
                  // overflow: "unset !important",
                  borderRadius: "12px",
                }}
              >
                <CommonStyles.Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",

                    borderRadius: "12px",
                  }}
                >
                  {data.map((rowData, index) => {
                    return (
                      <TableContent
                        rowData={rowData}
                        calculateTemplate={calculateTemplate}
                        key={rowData.id}
                        columns={columns}
                        hasCheckbox={hasCheckbox}
                        isOdd={index % 2 === 1}
                        selectedRows={selectedRows}
                        handleSelectRow={handleSelectRow}
                      />
                    );
                  })}
                </CommonStyles.Box>
              </PerfectScrollBar>
            </CommonStyles.Box>
          </CommonStyles.Box>
        )}
      </PerfectScrollBar>
      {!disabledPagination && (
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          pageSize={pageSize}
          handleChangePageSize={handleChangePageSize}
        />
      )}
    </CommonStyles.Box>
  );
};

export default Table;
