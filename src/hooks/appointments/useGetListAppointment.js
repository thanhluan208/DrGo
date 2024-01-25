import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";
import appointmentModel from "../../models/appointmentsModel";

const useGetListAppointment = (filters, isTrigger = true) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    return FirebaseServices.getAppointmentByDate(
      filters?.currentDate,
      filters?.pageSize
    );
  }, [filters?.currentDate, filters?.pageSize]);

  const transformResponse = useCallback((response) => {
    if (response) {
      const transformedData =
        appointmentModel.parseResponseAppointment(response);

      setData(transformedData);
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

export default useGetListAppointment;
