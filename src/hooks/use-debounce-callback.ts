import { useCallback, useEffect, useRef } from 'react';

import { TimeOutId } from '../types/general';

export const useDebounceCallback = (func: Function, delay = 300) => {
  const timerId = useRef<TimeOutId | undefined>();

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      const timeoutFunc = () => {
        if (timerId.current) clearTimeout(timerId.current);
        func(...args);
      };

      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(timeoutFunc, delay);
    },
    [func, delay]
  );

  return debouncedCallback;
};
