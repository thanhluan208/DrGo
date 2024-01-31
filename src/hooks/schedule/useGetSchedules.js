import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";

const useGetSchedules = (filters, isTrigger = true) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    const { doctor, date } = filters;
    const startDate = date.startOf("week").toDate();
    const endDate = date.endOf("week").toDate();

    console.log("filters", {
      doctor,
      startDate,
      endDate,
    });

    return FirebaseServices.getSchedules({
      doctor,
      startDate,
      endDate,
    });
  }, [filters]);

  const transformResponse = useCallback((response) => {
    if (response) {
      setData(response);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [callApi]);

  useEffect(() => {
    let shouldSetData = true;

    if (isTrigger) {
      (async () => {
        try {
          setLoading(true);
          const response = await callApi();

          if (shouldSetData) {
            transformResponse(response);
          }
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();

      return () => {
        shouldSetData = false;
      };
    }
  }, [isTrigger, callApi]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetSchedules;
