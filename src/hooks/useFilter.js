import { cloneDeep, isArray } from "lodash";
import { useCallback, useState } from "react";

const useFilter = (initialFilter) => {
  //! State
  const [filters, setFilters] = useState(initialFilter);

  //! Function

  const handleChangeSort = useCallback(
    (newSortBy) => {
      if (newSortBy === filters.sortBy) {
        setFilters((prev) => {
          return {
            ...prev,
            sortDirection:
              prev?.sortDirection?.toLowerCase() === "desc" ? "asc" : "desc",
          };
        });
      } else {
        setFilters((prev) => {
          return {
            ...prev,
            sortBy: newSortBy,
            sortDirection: "asc",
          };
        });
      }
    },
    [filters]
  );

  const handleSelectRow = useCallback((row) => {
    setFilters((prev) => {
      const prevSelectedRows = prev?.selectedRows;
      if (!prevSelectedRows || !isArray(prevSelectedRows)) {
        throw new Error("selectedRows must be an array");
      } else {
        const index = prevSelectedRows.findIndex(
          (item) => item?.id === row?.id
        );

        if (index === -1) {
          return {
            ...prev,
            selectedRows: [...prevSelectedRows, row],
          };
        } else {
          const nextPrevSelectedRows = cloneDeep(prevSelectedRows);
          nextPrevSelectedRows.splice(index, 1);
          return {
            ...prev,
            selectedRows: nextPrevSelectedRows,
          };
        }
      }
    });
  }, []);

  const handleSelectAll = useCallback((data) => {
    setFilters((prev) => {
      const prevSelectedRows = prev?.selectedRows;
      if (!prevSelectedRows || !isArray(prevSelectedRows)) {
        throw new Error("selectedRows must be an array");
      } else {
        if (prevSelectedRows.length === 0) {
          return {
            ...prev,
            selectedRows: data,
          };
        } else {
          return {
            ...prev,
            selectedRows: [],
          };
        }
      }
    });
  }, []);

  const handleChangePage = useCallback((field = "page", newPage) => {
    setFilters((prev) => {
      return {
        ...prev,
        [field]: newPage - 1,
      };
    });
  }, []);

  const handleChangePageSize = useCallback(
    (field = "pageSize", newPageSize) => {
      setFilters((prev) => {
        return {
          ...prev,
          [field]: newPageSize,
        };
      });
    },
    []
  );

  return {
    handleChangeSort,
    handleChangePage,
    filters,
    setFilters,
    handleSelectRow,
    handleSelectAll,
    handleChangePageSize,
  };
};

export default useFilter;
