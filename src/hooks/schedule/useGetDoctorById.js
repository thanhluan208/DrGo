import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";

const useGetDoctorById = (id, isTrigger = true) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    return FirebaseServices.getDoctorById(id);
  }, [id]);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();

      setData(response);
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
            setData(response);
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

export default useGetDoctorById;
