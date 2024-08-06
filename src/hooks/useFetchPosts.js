import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance"; // Import your configured axios instance

const useFetchPosts = (initialUrl) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(initialUrl); // Manage URL state for pagination
  const token = localStorage.getItem("token"); // Retrieve the token from local storage

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state on new request

      try {
        const response = await axiosInstance.get(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "", // Include Bearer token if available
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]); // Fetch data whenever URL or token changes

  const handlePageChange = (newUrl) => {
    //console.log(newUrl);
    setUrl(newUrl); // Update URL for fetching posts
  };

  return { data, error, loading, handlePageChange }; // Return handlePageChange for pagination
};

export default useFetchPosts;
