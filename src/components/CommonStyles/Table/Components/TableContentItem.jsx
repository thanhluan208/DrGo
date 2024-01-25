import { memo, useEffect, useMemo } from "react";
import CommonStyles from "../..";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@emotion/react";

const TableContentItem = ({ item, data, isOdd }) => {
  //! State
  const theme = useTheme();
  const stickyStyle = useMemo(() => {
    if (item?.isSticky) {
      return {
        position: "sticky",
        left: 0,
      };
    }
    return {};
  }, [item]);

  const calculateTemplate = useMemo(() => {
    let template = "";
    if (item?.childrens) {
      for (const child of item?.childrens) {
        if (child.width && child.width > 0) {
          template += " " + child.width + "px";
        } else {
          template += " 1fr";
        }
      }
    }

    return template;
  }, [item]);
  //! Function

  //! Render
  if (item?.renderContent)
    return (
      <CommonStyles.Box
        key={item.id}
        sx={{
          padding: "16px",
          alignItems: "center",
          display: "flex",
          maxHeight: "64px",
          background: isOdd
            ? theme.colors.custom.backgroundSecondary
            : theme.colors.custom.background,
          ...stickyStyle,
        }}
      >
        {item.renderContent(data)}
      </CommonStyles.Box>
    );

  if (item?.childrens) {
    return (
      <CommonStyles.Box
        sx={{
          display: "grid",
          gridTemplateColumns: calculateTemplate,
          cursor: "pointer",
          transition: "all .3s ease-in-out",
          "&:hover": {
            background: "#e7e7e7",
          },
        }}
      >
        {item?.childrens.map((child) => {
          const key = uuidv4();

          return (
            <TableContentItem
              item={child}
              data={data}
              isOdd={isOdd}
              key={key}
            />
          );
        })}
      </CommonStyles.Box>
    );
  }
  return (
    <CommonStyles.Box
      sx={{
        padding: "16px",
        maxHeight: "64px",
        alignItems: "center",
        display: item?.isTextOverFlow ? "unset" : "flex",
        background: isOdd
          ? theme.colors.custom.backgroundSecondary
          : theme.colors.custom.background,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <CommonStyles.Typography type="normal14">
        {data[item.id]}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default memo(TableContentItem);
