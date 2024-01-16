import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../services/firebaseServices";

const useGetAllDocs = (collection, transformResponse, isTrigger = true) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const callApi = useCallback(() => {
    if (!collection) return;
    return FirebaseServices.getAllDocs(collection);
  }, [collection]);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      const transformedResponse = transformResponse
        ? transformResponse(response)
        : response;
      setData(transformedResponse);
    } catch (error) {
      setError(error);
    }
  }, [callApi, transformResponse]);

  useEffect(() => {
    let shouldSetData = true;

    if (isTrigger) {
      (async () => {
        try {
          setLoading(true);
          const response = await callApi();

          if (shouldSetData) {
            const transformedResponse = transformResponse
              ? transformResponse(response)
              : response;
            setData(transformedResponse);
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
  }, [callApi, isTrigger, transformResponse]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAllDocs;
