import { useEffect, useState, useCallback } from "react";
import FirebaseServices from "../../services/firebaseServices";
import { useSave } from "../../stores/useStores";
import useToast from "../useToast";
import appointmentModel from "../../models/appointmentsModel";

//* Check parse body request

const useGetListAppointment = (
  filters,
  options = { isTrigger: true, refetchKey: "" }
) => {
  //! State
  const { isTrigger = true, refetchKey = "" } = options;

  const save = useSave();
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isRefetching, setRefetching] = useState(false);
  const [isFetchingPage, setFetchingPage] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { currentDate, pageSize } = filters;
          const response = await FirebaseServices.getAppointmentByDate(
            currentDate,
            pageSize
          );
          const parsedResponse =
            appointmentModel.parseResponseAppointment(response);
          resolve(parsedResponse);
        } catch (error) {
          console.log("error", error);
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response) => {
      //* Check condition of response here to set data
      setData(response);
      setHasMore((filters.page || 1) < response?.data?.data?.totalPage);
    },
    [filters.page]
  );

  const fetchChangePage = useCallback(
    async (shouldSetData) => {
      setFetchingPage(true);
      const response = await fetch();
      if (shouldSetData && response) {
        checkConditionPass(response);
      }

      setFetchingPage(false);
    },
    [fetch, checkConditionPass]
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      setRefetching(true);
      const { currentDate, pageSize } = filters;
      const response = await FirebaseServices.getAppointmentByDate(
        currentDate,
        pageSize
      );
      checkConditionPass(response);
      setRefetching(false);
    } catch (error) {
      if (!error.isCanceled) {
        useToast(error, "error");
      }
    }
  }, [filters]);

  useEffect(() => {
    if (refetchKey) {
      save(refetchKey, refetch);
    }
  }, [save, refetchKey, refetch]);

  //* Refetch with changing loading state
  const refetchWithLoading = useCallback(
    async (shouldSetData) => {
      try {
        setLoading(true);
        const response = await fetch();
        if (shouldSetData && response) {
          checkConditionPass(response);
        }
        setLoading(false);
      } catch (error) {
        useToast(error, "error");
        setLoading(false);
      }
    },
    [fetch, checkConditionPass]
  );

  useEffect(() => {
    let shouldSetData = true;
    if (filters.page !== undefined && filters.page <= 0) {
      refetchWithLoading(shouldSetData);
      return;
    }

    //* If offset > 0 -> fetch more
    fetchChangePage(shouldSetData);

    return () => {
      shouldSetData = false;
    };
  }, [filters.page, fetchChangePage, refetchWithLoading]);

  return {
    data,
    isLoading,
    error,
    refetch,
    refetchWithLoading,
    isRefetching,
    isFetchingPage,
    hasMore,
    setData,
  };
};

export default useGetListAppointment;
