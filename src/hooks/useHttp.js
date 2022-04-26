import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig, dataHandler) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch(requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      let data;
      
      if (response.status === 204) {
        data = 'Deleted!';
      } else {
        data = await response.json();
      }
      
      if(!response.ok) {
        throw new Error(data.message || 'Request failed!');
      };

        dataHandler(data);
      } catch (error) {
        console.log(error)
        setError(error.message || 'Ooops, Something went wrong!');
      };

      setIsLoading(false);
    }, []);

    return {
      isLoading,
      error,
      sendRequest
    };
};

export default useHttp;