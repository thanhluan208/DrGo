import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";
import { cloneDeep } from "lodash";
import doctorModel from "../../models/doctorModel";

const useGetListDoctor = (isTrigger = true) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    return FirebaseServices.getListDoctors();
  }, []);

  const transformResponse = useCallback((response) => {
    if (response) {
      const transformedData = doctorModel.parseResponseDoctorList(response);
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
  }, []);

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
  }, [isTrigger]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetListDoctor;
