// useFetch.js
import { useState } from "react";
import axios from "axios";

function useFetch() {
  const [errorFetch, setError] = useState(null);

  const fetchData = async (
    url,
    method = "GET",
    requestData = null,
    token = null,
    config = {}
  ) => {
    setError(null);

    try {
      const headers = {};
      if (token) {
        headers.Authorization = token; // Добавляем токен в заголовки запроса
      }
      const response = await axios.request({
        method,
        url,
        data: requestData,
        headers,
        ...config,
      });

      return response;
    } catch (err) {
      setError(err.response);
    }
  };

  return { errorFetch, fetchData };
}

export default useFetch;
