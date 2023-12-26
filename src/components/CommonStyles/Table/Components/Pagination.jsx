import React, { useCallback } from "react";
import CommonStyles from "../..";
import { useTranslation } from "react-i18next";
import Previous from "../../../../assets/icons/Previous";
import { useTheme } from "@emotion/react";
import { pageSizeOptions } from "../../../../constants/options";

const Pagination = ({
  totalPage,
  currentPage,
  handleChangePage,
  pageSize,
  handleChangePageSize,
}) => {
  //! State
  const { t } = useTranslation();
  const theme = useTheme();

  //! Function

  //! Render
  const renderPage = useCallback(() => {
    let pages = ["1"];
    if (currentPage === 2 || currentPage === 1) {
      pages = ["1", "2", "...", `${totalPage}`];
    } else if (currentPage === totalPage - 1 || currentPage === totalPage) {
      pages = ["1", "...", `${totalPage - 1}`, `${totalPage}`];
    } else {
      pages = [
        "1",
        "...",
        `${currentPage - 1}`,
        `${currentPage}`,
        `${currentPage + 1}`,
        "...",
        `${totalPage}`,
      ];
    }

    return (
      <CommonStyles.Box
        centered
        sx={{
          gap: "8px",
          button: {
            width: "32px",
            height: "32px",
            padding: 0,
          },
        }}
      >
        {pages.map((page, index) => {
          if (+page === currentPage)
            return (
              <CommonStyles.IconButton
                hasNoti={false}
                key={`${page}-${index}`}
                customSx={{
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CommonStyles.Typography
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  {page}
                </CommonStyles.Typography>
              </CommonStyles.IconButton>
            );

          return (
            <CommonStyles.IconButton
              hasNoti={false}
              key={`${page}-${index}`}
              customSx={
                page === "..."
                  ? {
                      cursor: "default",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }
                  : {}
              }
              onClick={() => {
                if (page === "...") return;
                handleChangePage("currentPage", +page);
              }}
            >
              <CommonStyles.Typography>{page}</CommonStyles.Typography>
            </CommonStyles.IconButton>
          );
        })}
      </CommonStyles.Box>
    );
  }, [totalPage, currentPage, handleChangePage]);

  return (
    <CommonStyles.Box
      sx={{
        width: "100%",
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CommonStyles.Box
        centered
        sx={{
          gap: "8px",
        }}
      >
        <CommonStyles.Select
          options={pageSizeOptions}
          renderValue={(label) => {
            return (
              <CommonStyles.Typography type="normal14" color="secondaryText">
                {label}
              </CommonStyles.Typography>
            );
          }}
          sx={{
            width: "60px",
            padding: 0,
            height: "32px",
            display: "flex",
            alignItems: "center",
            fieldset: {
              border: "none",
              borderBottom: `1px solid ${theme.palette.primary.main}`,
              borderRadius: "0px",
              "&:hover": {
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              },
            },
          }}
          defaultValue={10}
          onChange={(e) => handleChangePageSize(e.target.value)}
          value={pageSize}
        />

        <CommonStyles.Typography type="normal14">
          {t("showOnPage")}
        </CommonStyles.Typography>
      </CommonStyles.Box>
      <CommonStyles.Box centered>
        <CommonStyles.Typography>{t("page")}</CommonStyles.Typography>
        <CommonStyles.Box
          sx={{
            display: "flex",
          }}
        >
          <CommonStyles.IconButton
            customSx={{
              svg: {
                width: "7.5px",
                height: "12px",
              },
            }}
            onClick={() => {
              handleChangePage("currentPage", currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            <Previous />
          </CommonStyles.IconButton>
          {renderPage()}
          <CommonStyles.IconButton
            customSx={{
              svg: {
                width: "7.5px",
                height: "12px",
                transform: "rotate(180deg)",
              },
            }}
            onClick={() => {
              handleChangePage("currentPage", currentPage + 1);
            }}
            disabled={currentPage === totalPage}
          >
            <Previous />
          </CommonStyles.IconButton>
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box></CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Pagination;
