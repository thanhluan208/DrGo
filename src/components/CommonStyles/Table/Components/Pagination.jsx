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
    let pages = [];
    const nextCurrentPage = currentPage + 1;
    if (totalPage <= 3) {
      for (let i = 0; i < totalPage; i++) {
        pages.push(`${i + 1}`);
      }
    } else {
      pages.push("1");
      if (nextCurrentPage === 2 || nextCurrentPage === 1) {
        pages = ["1", "2", "...", `${totalPage}`];
      } else if (
        nextCurrentPage === totalPage - 1 ||
        nextCurrentPage === totalPage
      ) {
        pages = ["1", "...", `${totalPage - 1}`, `${totalPage}`];
      } else {
        pages = [
          "1",
          "...",
          `${nextCurrentPage - 1}`,
          `${nextCurrentPage}`,
          `${nextCurrentPage + 1}`,
          "...",
          `${totalPage}`,
        ];
      }
    }

    return pages.map((page, index) => {
      if (+page === currentPage + 1) {
        return (
          <CommonStyles.IconButton key={`${page}-${index}`}>
            <CommonStyles.Box
              centered
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: "32px",
                height: "32px",
                borderRadius: "4px",
              }}
            >
              <CommonStyles.Typography
                type="normal14"
                sx={{ color: theme.colors.white }}
              >
                {+page}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          </CommonStyles.IconButton>
        );
      }

      return (
        <CommonStyles.IconButton
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
            handleChangePage("currentPage", +page - 1);
          }}
        >
          <CommonStyles.Box
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              border: "solid 1px #E8E8E8",
            }}
            centered
          >
            <CommonStyles.Typography
              type="normal14"
              sx={{
                color: "#25282B",
              }}
            >
              {page}
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.IconButton>
      );
    });
  }, [totalPage, currentPage, handleChangePage]);

  if (!totalPage) return null;

  return (
    <CommonStyles.Box
      sx={{
        width: "100%",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        padding: "20px 24px",
      }}
    >
      <CommonStyles.Box
        sx={{
          display: "flex",
          gap: "4px",
        }}
      >
        <CommonStyles.IconButton
          onClick={() => {
            handleChangePage("currentPage", currentPage - 1);
          }}
          disabled={currentPage + 1 === 1}
        >
          <CommonStyles.Box
            centered
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              border: "solid 1px #E8E8E8",
            }}
          >
            <Previous fill={currentPage + 1 !== 1 ? "#52575C" : "#E8E8E8"} />
          </CommonStyles.Box>
        </CommonStyles.IconButton>
        {renderPage()}
        <CommonStyles.IconButton
          customSx={{
            svg: {
              transform: "rotate(180deg)",
            },
          }}
          onClick={() => {
            handleChangePage("currentPage", currentPage + 1);
          }}
          disabled={currentPage + 1 === totalPage}
        >
          <CommonStyles.Box
            centered
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              border: "solid 1px #E8E8E8",
            }}
          >
            <Previous
              fill={currentPage + 1 !== totalPage ? "#52575C" : "#E8E8E8"}
            />
          </CommonStyles.Box>
        </CommonStyles.IconButton>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default Pagination;
