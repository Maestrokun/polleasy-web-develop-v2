/* eslint-disable */
import { useEffect } from 'react';

const useIntersectionObserver = ({
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
};

export default useIntersectionObserver;
