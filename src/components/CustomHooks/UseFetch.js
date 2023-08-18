import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error.message);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        alert(error.message);
      }
    };

    if (!!localStorage.getItem("idToken")) {
      fetchData();
    }
  }, [url]);

  return data;
};

export default useFetch;
