import React, { memo, useCallback, useEffect, useMemo } from "react";
import CommonIcons from "../../../CommonIcons";
import CommonStyles from "../..";
import { Checkbox } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TableHeaderChild from "./TableHeaderChild";
import { useTheme } from "@emotion/react";

const TableHeader = ({
  sortBy,
  sortDirection,
  handleChangeSort,
  columns,
  hasCheckbox,
  disabledCheckboxHeader,
  data,
  calculateTemplate,
  headerLevel = 1,
  tableWidth,
  handleSelectAll,
  selectedRows,
}) => {
  //! State
  const theme = useTheme();
  const headerHeight = useMemo(() => {
    if (headerLevel === 1) return 67;
    else return 45;
  }, [headerLevel]);

  //! Function

  //! Render
  const renderSort = useCallback(() => {
    if (!sortBy || !sortDirection) return null;

    return (
      <CommonIcons.Up
        style={{
          transform:
            sortDirection.toLowerCase() === "desc"
              ? "rotate(180deg)"
              : "rotate(0deg)",
          transition: "all .15s ease-in",
          animation: "fadeInSort 0.5s ease-out forwards",
          "@keyframes fadeInSort": {
            "0%": {
              opacity: 0,
            },
            "100%": {
              opacity: 1,
            },
          },
        }}
      />
    );
  }, [sortBy, sortDirection]);

  const renderCheckboxHeader = useCallback(
    (shouldHide) => {
      if (hasCheckbox) {
        if (disabledCheckboxHeader || shouldHide)
          return <CommonStyles.Box sx={{ padding: "16px" }}></CommonStyles.Box>;

        return (
          <CommonStyles.Box centered>
            <CommonStyles.IconButton
              hasNoti={false}
              customSx={{
                width: "18px",
                height: "18px",
                background:
                  selectedRows.length > 0
                    ? theme.palette.primary.main
                    : "transparent",
                border: `1px solid ${theme.palette.primary.main}`,
                padding: 0,
                "&:hover": {
                  background:
                    selectedRows.length > 0
                      ? theme.palette.primary.main
                      : "transparent",
                  opacity: 0.8,
                },
              }}
              onClick={() => {
                handleSelectAll(data);
              }}
            >
              <CommonStyles.Typography type="normal12" color="background">
                {selectedRows.length > 0 ? selectedRows.length : ""}
              </CommonStyles.Typography>
            </CommonStyles.IconButton>
          </CommonStyles.Box>
        );
      }
    },
    [hasCheckbox, disabledCheckboxHeader, headerLevel, selectedRows, data]
  );

  return (
    <CommonStyles.Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderRadius: "8px",
        marginBottom: "15px",
        boxShadow: "0px 2px 6px rgba(100, 116, 139, 0.12)",
        border: `1px solid ${theme.palette.divider}`,
        background: theme.colors.custom.background,
        minWidth: "100%",
        width: !!tableWidth ? tableWidth : "100%",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "grid",
          gridTemplateColumns: calculateTemplate,
        }}
      >
        {renderCheckboxHeader()}
        {columns.map((item) => {
          const key = uuidv4();
          return (
            <CommonStyles.Box
              key={key}
              sx={{
                padding: "0 16px",
                cursor: item?.sortable ? "pointer" : "",
                position: item?.isSticky ? "sticky" : "relative",
                left: item?.isSticky ? 0 : "",
                background: theme.colors.custom.background,
                zIndex: item?.isSticky ? 101 : "",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  right: "0",
                  height: "66%",
                  width: "2px",
                  background: theme.colors.custom.background,
                  transform: "translateY(-50%)",
                },
              }}
              onClick={() => {
                if (item?.sortable) {
                  handleChangeSort(item.id);
                }
              }}
            >
              <CommonStyles.Box
                sx={{
                  gap: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  borderBottom: item?.childrens
                    ? `1px solid ${theme.palette.divider}`
                    : " ",
                  height: item?.childrens
                    ? `${headerHeight}px`
                    : `${headerLevel * headerHeight}px`,
                }}
              >
                {item?.renderTitle ? item.renderTitle(item, data) : item.title}

                {sortBy === item.id && renderSort()}
              </CommonStyles.Box>

              <TableHeaderChild
                item={item}
                currentLevel={1}
                totalLevel={headerLevel}
                renderSort={renderSort}
              />
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default memo(TableHeader);
