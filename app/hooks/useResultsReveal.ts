import { useState, useEffect, useRef } from "react";
import { SweepstakeResult } from "../types";

type RevealOptions = {
  revealDelayMs?: number;
};

const scrollContainerToBottom = (container: HTMLDivElement | null): void => {
  if (!container) return;
  container.scrollTo({
    top: container.scrollHeight,
    behavior: "smooth",
  });
};

const scrollWindowToBottom = (): void => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

export const useResultsReveal = (
  results: SweepstakeResult[],
  isDrawing: boolean,
  options: RevealOptions = {}
) => {
  const { revealDelayMs = 1800 } = options;
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDrawing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCount(0);
      return;
    }

    const hasTeamsToReveal = results.length > 0;
    const hasRemainingReveals = visibleCount < results.length;

    if (hasTeamsToReveal && hasRemainingReveals) {
      const currentDelay = visibleCount === 0 ? 0 : revealDelayMs;

      const revealTimer = setTimeout(() => {
        setVisibleCount((previousCount) => previousCount + 1);
      }, currentDelay);

      return () => clearTimeout(revealTimer);
    }
  }, [isDrawing, results.length, visibleCount, revealDelayMs]);

  useEffect(() => {
    const hasVisibleCards = visibleCount > 0;

    if (hasVisibleCards) {
      scrollContainerToBottom(scrollContainerRef.current);
      scrollWindowToBottom();
    }
  }, [visibleCount]);

  const isRevealComplete =
    results.length > 0 && visibleCount === results.length;

  return {
    visibleCount,
    scrollContainerRef,
    isRevealComplete,
  };
};
