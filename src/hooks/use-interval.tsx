import { useEffect, useRef } from 'react';

export default function useInterval<C extends CallableFunction>(
  cb: C,
  delay: number | null
): void {
  const savedCb = useRef<C>();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    function tick() {
      if (savedCb.current) savedCb.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
