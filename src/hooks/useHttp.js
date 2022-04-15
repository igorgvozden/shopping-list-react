import { useState } from 'react';

const useHttp = (requestConfig, dataHandler) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async() => {
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

      if(!response.ok) throw new Error('Request failed!');
        const data = await response.json();

        dataHandler(data);
      } catch (error) {
        setError(error.message || 'Ooops, Something went wrong!');
      };

      setIsLoading(false);
    };

    return {
      isLoading,
      error,
      sendRequest
    };
};

export default useHttp;