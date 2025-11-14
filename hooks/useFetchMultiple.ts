import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useFetchMultiple<T = unknown>(urls: string[]) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async () => {
    if (urls.length === 0) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setHasError(false);

    try {
      const promises = urls.map((url) => axios.get<T>(url));
      const responses = await Promise.all(promises);
      const results = responses.map((response) => response.data);
      setData(results);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    loading,
    hasError,
    refetch,
  };
}

export default useFetchMultiple;
