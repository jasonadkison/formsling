import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const useApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const signalRef = useRef();

  const doFetch = async () => {
    signalRef.current = axios.CancelToken.source();
    let mounted = true;

    setError(false);
    setLoading(true);

    await axios(url, { cancelToken: signalRef.current.token })
      .then(({ data }) => {
        if (mounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted && !axios.isCancel(err)) setError(err.response.status);
      });
  };

  useEffect(() => {
    doFetch();
    return () => signalRef.current.cancel('Request aborted');
  }, [url]);

  const refresh = useCallback(() => {
    signalRef.current.cancel('Request aborted');
    doFetch();
  }, []);

  return [{ data, loading, error }, refresh];
};

export default useApi;
