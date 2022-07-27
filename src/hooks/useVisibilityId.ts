import { useEffect } from 'react';

export const useVisibilityId = (
  entry?: IntersectionObserverEntry,
  callback?: (id: string) => void
) => {
  useEffect(() => {
    if (entry?.isIntersecting) {
      callback?.(entry?.target.id);
    }
  }, [callback, entry?.isIntersecting, entry?.target.id]);
};
