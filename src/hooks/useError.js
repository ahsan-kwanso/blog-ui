import { useState, useEffect } from "react";

const useError = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    if (error) {
      // Automatically clear the error after 4 seconds
      timer = setTimeout(() => setError(null), 4000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return [error, setError];
};

export default useError;
