"use client";

import { ProgressBar } from "@/components/ui/progress-bar";
import { COURSE_VIDEO_SRC } from "@/constants/course-video";
import { useVideoProgressPercent } from "@/hooks/use-video-progress";

export default function CourseProgressBar() {
  const percent = useVideoProgressPercent(COURSE_VIDEO_SRC);
  return <ProgressBar value={percent} />;
}
