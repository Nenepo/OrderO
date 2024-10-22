import { useCallback, useEffect, useState } from "react"

// Function to send HTTP requests
async function sendHttpRequest(url, config) {
  // Sending the request with the given URL and configuration (method, headers, body, etc.)
  const response = await fetch(url, config);

  // Parsing the response as JSON. This happens whether the request is successful or fails.
  const resData = await response.json();

  // If the response status is not OK (status code outside the 200-299 range), throw an error.
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong");
  }

  // Return the parsed data if the request was successful
  return resData;
}



export default function useHttp(url, config, initialData) {

  // State to store the response data, initially set to 'initialData'
  const [data, setData] = useState(initialData);

  // State to store any error messages if the request fails
  const [error, setError] = useState();

  // State to track whether the request is loading
  const [isLoading, setIsLoading] = useState(false);

   // Function that sends the request. It's wrapped in 'useCallback' to avoid unnecessary re-creations of this function.
   const sendRequest = useCallback(
    async function sendRequest(data) {
    setIsLoading(true);  // Start loading before making the request
    try {
      // Send the request and wait for the response data
      const resData = await sendHttpRequest(url, {...config, body: data});

      // On success, update the data state with the response data
      setData(resData);
    } catch (error) {
      // If there's an error, update the error state
      setError(error.message || "Something went wrong");
    }

    // When the request is done (either success or failure), stop loading
    setIsLoading(false);
  }, [url, config]);  // Dependencies: the function will change if 'url' or 'config' changes

  // Automatically send a request if the method is GET (or if config is not provided)
  useEffect(() => {
    if (config && config.method === "GET" || !config.method || !config) {
      sendRequest();  // Automatically send the request when conditions are met
    }
  }, [sendRequest, config]);  // Dependencies: This will run when 'sendRequest' or 'config' changes


    // Return the state and function from the hook
    return {
      data,
      isLoading,
      error,
      sendRequest,  // Allow users of this hook to manually trigger the request
    };
  }
  