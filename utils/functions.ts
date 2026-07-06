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