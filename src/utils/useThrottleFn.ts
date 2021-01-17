import { useRef } from 'react';
import throttle from 'lodash.throttle';
import useCreation from './useCreation';

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

type Fn = (...args: any) => any;

function useThrottleFn<T extends Fn>(fn: T, options: ThrottleOptions = {
  wait: 1000
}) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options.wait;

  const throttled = useCreation(
    () =>
      throttle<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  return {
    run: (throttled as unknown) as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}

export default useThrottleFn;
