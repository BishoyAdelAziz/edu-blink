const VIDEO_PROGRESS_PREFIX = "video-progress";
export const VIDEO_PROGRESS_UPDATED_EVENT = "video-progress-updated";

export type VideoProgress = {
  watchedTime: number;
  playbackTime: number;
  progressPercent?: number;
  duration?: number;
};

export function getVideoProgressKey(src: string) {
  return `${VIDEO_PROGRESS_PREFIX}:${src}`;
}

export function loadVideoProgress(src: string): VideoProgress {
  if (typeof window === "undefined") {
    return { watchedTime: 0, playbackTime: 0 };
  }

  const stored = localStorage.getItem(getVideoProgressKey(src));
  if (!stored) return { watchedTime: 0, playbackTime: 0 };

  try {
    const parsed = JSON.parse(stored) as Partial<VideoProgress>;
    const watchedTime = Number(parsed.watchedTime);
    const playbackTime = Number(parsed.playbackTime);

    return {
      watchedTime: Number.isFinite(watchedTime) && watchedTime > 0 ? watchedTime : 0,
      playbackTime: Number.isFinite(playbackTime) && playbackTime > 0 ? playbackTime : 0,
      progressPercent: Number.isFinite(Number(parsed.progressPercent))
        ? Math.min(100, Math.max(0, Number(parsed.progressPercent)))
        : undefined,
      duration: Number.isFinite(Number(parsed.duration)) && Number(parsed.duration) > 0
        ? Number(parsed.duration)
        : undefined,
    };
  } catch {
    const legacyTime = Number(stored);
    if (Number.isFinite(legacyTime) && legacyTime > 0) {
      return { watchedTime: legacyTime, playbackTime: legacyTime };
    }
    return { watchedTime: 0, playbackTime: 0 };
  }
}

export function saveVideoProgress(src: string, progress: VideoProgress) {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(progress.watchedTime) || progress.watchedTime < 0) return;
  if (!Number.isFinite(progress.playbackTime) || progress.playbackTime < 0) return;

  localStorage.setItem(getVideoProgressKey(src), JSON.stringify(progress));
}

export function loadVideoProgressPercent(src: string): number {
  const { watchedTime, progressPercent, duration } = loadVideoProgress(src);

  if (Number.isFinite(progressPercent)) {
    return Math.min(100, Math.max(0, progressPercent!));
  }

  return getProgressPercentage(watchedTime, duration ?? 0);
}

export function notifyVideoProgressUpdate(src: string, percent: number) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(VIDEO_PROGRESS_UPDATED_EVENT, {
      detail: { src, percent: Math.min(100, Math.max(0, percent)) },
    }),
  );
}

export function getProgressPercentage(watchedTime: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  if (!Number.isFinite(watchedTime) || watchedTime <= 0) return 0;

  return Math.min(100, (watchedTime / duration) * 100);
}

/** Max jump between timeupdate ticks treated as natural playback (~2s). */
export const ORGANIC_PLAYBACK_JUMP_THRESHOLD = 2;

/** Persist organic progress every N seconds of actual watching. */
export const PROGRESS_SAVE_INTERVAL = 30;

export function isOrganicPlaybackStep(
  previousTime: number,
  currentTime: number,
  threshold = ORGANIC_PLAYBACK_JUMP_THRESHOLD,
) {
  const delta = currentTime - previousTime;
  return delta >= 0 && delta < threshold;
}

export function formatTime(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function readVideoDuration(video: HTMLVideoElement): number {
  const d = video.duration;
  if (Number.isFinite(d) && d > 0) return d;

  if (video.seekable.length > 0) {
    const end = video.seekable.end(video.seekable.length - 1);
    if (Number.isFinite(end) && end > 0) return end;
  }

  return 0;
}

type WebkitVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function isVideoFullscreen(video: HTMLVideoElement) {
  const webkitVideo = video as WebkitVideoElement;
  return !!document.fullscreenElement || !!webkitVideo.webkitDisplayingFullscreen;
}

export function toggleVideoFullscreen(
  video: HTMLVideoElement,
  container?: HTMLElement | null,
) {
  const webkitVideo = video as WebkitVideoElement;

  if (webkitVideo.webkitDisplayingFullscreen) {
    webkitVideo.webkitExitFullscreen?.();
    return;
  }

  if (document.fullscreenElement) {
    void document.exitFullscreen();
    return;
  }

  // Mobile: native fullscreen on the <video> element (iOS + Android).
  if (isTouchDevice()) {
    if (webkitVideo.webkitEnterFullscreen) {
      webkitVideo.webkitEnterFullscreen();
      return;
    }

    void video.requestFullscreen?.();
    return;
  }

  // Desktop: fullscreen the player container so custom controls stay visible.
  void (container?.requestFullscreen?.() ?? video.requestFullscreen?.());
}
export function formatCommentDate(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp));
}
