"use client";

import { useEffect, useState } from "react";
import {
  loadVideoProgressPercent,
  VIDEO_PROGRESS_UPDATED_EVENT,
} from "@/utils/functions";

export function useVideoProgressPercent(src: string) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(loadVideoProgressPercent(src));

    const onProgressUpdate = (event: Event) => {
      const detail = (event as CustomEvent<{ src: string; percent: number }>).detail;
      if (detail?.src === src) {
        setPercent(detail.percent);
      }
    };

    window.addEventListener(VIDEO_PROGRESS_UPDATED_EVENT, onProgressUpdate);
    return () =>
      window.removeEventListener(VIDEO_PROGRESS_UPDATED_EVENT, onProgressUpdate);
  }, [src]);

  return percent;
}
