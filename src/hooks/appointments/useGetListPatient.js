import { useCallback, useEffect, useState } from "react";
import FirebaseServices from "../../services/firebaseServices";
import { isArray } from "lodash";
import { useSave } from "../../stores/useStores";
import { convertResponseToOptions } from "../../helpers/common";

const useGetListPatient = (filter, key, isTrigger = true) => {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const save = useSave();

  const callApi = useCallback(() => {
    if (!hasMore) return;
    const { page, pageSize, patientName } = filter;
    return FirebaseServices.getListPatient(page, pageSize, patientName);
  }, [filter, hasMore]);

  const transformResponse = useCallback(
    (response) => {
      if (isArray(response) && !!key) {
        const nextResponse = convertResponseToOptions(response, "id", "name");
        save(
          key,
          (prev) => {
            if (filter.page === 1) {
              return nextResponse;
            } else {
              return [...prev, ...nextResponse];
            }
          },
          true
        );
        if (response.length < filter.pageSize) {
          setHasMore(false);
        }
      }
    },
    [filter, key]
  );

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response);
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
  }, [callApi, isTrigger]);

  return {
    isLoading,
    error,
    refetch,
    hasMore,
  };
};

export default useGetListPatient;
