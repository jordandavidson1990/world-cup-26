import { useState, useEffect, useRef } from "react";
import { SweepstakeResult } from "../types";

export const useResultsReveal = (
  results: SweepstakeResult[],
  isDrawing: boolean
) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDrawing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(0);
    } else if (results.length > 0 && visibleCount === 0) {
      setVisibleCount(1);
    }
  }, [isDrawing, results, visibleCount]);

  useEffect(() => {
    if (
      !isDrawing &&
      results.length > 0 &&
      visibleCount > 0 &&
      visibleCount < results.length
    ) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, isDrawing, results.length]);

  useEffect(() => {
    if (scrollContainerRef.current && visibleCount > 0) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  const isRevealComplete = visibleCount === results.length;

  return {
    visibleCount,
    scrollContainerRef,
    isRevealComplete,
  };
};
