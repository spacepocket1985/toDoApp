import { useCallback, useState } from 'react';

type UseHttpType<T> = {
  isLoading: boolean;
  isError: string | null;
  fetchData: (url: string, options: RequestInit) => Promise<T | undefined>;
};

const useHttp = <T>(): UseHttpType<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (url: string, options: RequestInit): Promise<T | undefined> => {
      setIsLoading(true);
      setIsError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(
            `We have error in fetch data.${response.statusText} Code status - ${response.status}`
          );
        }

        const data: T = await response.json();
        return data;
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    isError,
    fetchData,
  };
};

export default useHttp;
