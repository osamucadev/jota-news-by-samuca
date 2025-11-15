import { useState, useCallback } from "react";
import axios from "axios";

interface UsePaginationParams<T> {
  initialData: T[];
  apiUrl: string;
  itemsPerPage?: number;
}

interface UsePaginationReturn<T> {
  data: T[];
  currentPage: number;
  loadingMore: boolean;
  hasMore: boolean;
  hasError: boolean;
  loadMore: () => Promise<void>;
}

function usePagination<T = unknown>({
  initialData,
  apiUrl,
  itemsPerPage = 10,
}: UsePaginationParams<T>): UsePaginationReturn<T> {
  const [data, setData] = useState<T[]>(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setHasError(false);

    try {
      const nextPage = currentPage + 1;
      const response = await axios.get<T[]>(
        `${apiUrl}?page=${nextPage}&limit=${itemsPerPage}`
      );

      const newData = response.data;

      if (newData.length < itemsPerPage) {
        setHasMore(false);
      }

      if (newData.length === 0) {
        setHasMore(false);
        return;
      }

      setData((prevData) => [...prevData, ...newData]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Erro ao carregar mais notícias:", error);
      setHasError(true);
    } finally {
      setLoadingMore(false);
    }
  }, [apiUrl, currentPage, hasMore, itemsPerPage, loadingMore]);

  return {
    data,
    currentPage,
    loadingMore,
    hasMore,
    hasError,
    loadMore,
  };
}

export default usePagination;
