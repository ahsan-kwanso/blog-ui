import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Import your configured axios instance

const useFetchPosts = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state on new request

      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Fetch data whenever URL or token changes

  return {
    data,
    error,
    loading,
  }; // Return handlePageChange for pagination
};

export default useFetchPosts;
