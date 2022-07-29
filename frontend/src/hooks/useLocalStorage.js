import { useCallback, useState } from 'react';

const useLocalStorage = (key, defaultValue = '') => {
  const [ state, setState ] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : localStorage.setItem(key, JSON.stringify(defaultValue));
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return [state, setValue];
};

export default useLocalStorage;
