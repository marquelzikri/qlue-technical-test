import { useEffect, useState } from 'react';

export default function useFetch({
  initialUrl,
  options
}: { initialUrl: string, options?: any }) {
  const [url, setUrl] = useState(initialUrl);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function isStorageAvailable() {
    var storage = window['localStorage'], x = '__storage_test__';

    try {
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage && storage.length !== 0;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const item = window.localStorage.getItem(url);

      if (item) {
        setResponse(JSON.parse(item));
        setIsLoading(false);
      } else {
        try {
          const res = await fetch(url, options ? options : {});
          const json = await res.json();

          setResponse(json);

          // Clear local storage when it's full
          if (!isStorageAvailable()) {
            window.localStorage.clear();
          }

          window.localStorage.setItem(url, JSON.stringify(json));

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError(error);
        }
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, [url]);

  return { response, error, isLoading, setUrl };
}