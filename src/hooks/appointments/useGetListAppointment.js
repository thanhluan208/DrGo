import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";
import appointmentModel from "../../models/appointmentsModel";
import PromiseHandler from "../../helpers/promiseHandler";

const PromiseGetListAppointment = new PromiseHandler();

const useGetListAppointment = (filters, isTrigger = true) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    return FirebaseServices.getAppointmentByDate(
      filters?.currentPage,
      filters?.pageSize,
      filters?.status,
      filters?.date,
      filters?.doctor,
      filters?.sortBy
    );
  }, [
    filters?.currentPage,
    filters?.pageSize,
    filters?.status,
    filters?.date,
    filters?.doctor,
    filters?.sortBy,
  ]);

  const transformResponse = useCallback((response) => {
    if (response) {
      const { responseData, totalPage } = response;
      const transformedData =
        appointmentModel.parseResponseAppointment(responseData);

      setData({
        listAppointment: transformedData,
        totalPage,
      });
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await PromiseGetListAppointment.takeLatest(callApi());
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, [callApi]);

  useEffect(() => {
    let shouldSetData = true;

    if (isTrigger) {
      (async () => {
        setLoading(true);
        PromiseGetListAppointment.takeLatest(callApi())
          .then((response) => {
            console.log("res", response);
            if (shouldSetData) {
              transformResponse(response);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log("err", error);
            if (!error.isCanceled) {
              setError(error);
              setLoading(false);
            }
          });
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
