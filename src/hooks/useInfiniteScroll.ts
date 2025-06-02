import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  callback: () => void,
  hasMore: boolean,
  isLoading: boolean
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, isLoading]);

  return observerRef;
}
