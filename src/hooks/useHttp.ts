import { useCallback, useState } from 'react';

type UseHttpType = {
  isLoading: boolean;
  isError: string | null;
  fetchData: <T>(url: string, options: RequestInit) => Promise<T | undefined>;
};

const useHttp = (): UseHttpType => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const fetchData = useCallback(
    async <T>(url: string, options: RequestInit): Promise<T | undefined> => {
      setIsLoading(true);
      setIsError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const errorData = await response.json();

          if (errorData.errors && Array.isArray(errorData.errors)) {
            const errorMessages = errorData.errors
              .map((err: { msg: unknown }) => err.msg)
              .join(', ');
            throw new Error(
              `Errors: ${errorMessages}. Code status - ${response.status}`
            );
          } else {
            const errorMessage = errorData.message || response.statusText;
            throw new Error(
              `Error: ${errorMessage}. Code status - ${response.status}`
            );
          }
        }

        const data: T = await response.json();
        return data;
      } catch (error) {
        console.log('er => ', error);
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
