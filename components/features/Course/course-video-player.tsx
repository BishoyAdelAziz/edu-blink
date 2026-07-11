"use client";

import {
  ExitFullscreenIcon,
  FullscreenIcon,
  MutedIcon,
  PauseIcon,
  PlayIcon,
  TheaterIcon,
  VolumeIcon,
} from "@/components/ui/icons";
import { COURSE_VIDEO_SRC } from "@/constants/course-video";
import {
  formatTime,
  getProgressPercentage,
  isOrganicPlaybackStep,
  loadVideoProgress,
  notifyVideoProgressUpdate,
  PROGRESS_SAVE_INTERVAL,
  readVideoDuration,
  saveVideoProgress,
  toggleVideoFullscreen,
  isVideoFullscreen,
} from "@/utils/functions";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = COURSE_VIDEO_SRC;

export default function CourseVideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTickTimeRef = useRef(0);
  const watchedTimeRef = useRef(0);
  const playbackTimeRef = useRef(0);
  const lastPersistedWatchedRef = useRef(0);
  const isSeekingRef = useRef(false);
  const isDraggingSeekRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [watchedTime, setWatchedTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const layout = document.getElementById("course-details-layout");
    if (!layout) return;

    if (theaterMode) {
      layout.setAttribute("data-theater", "true");
    } else {
      layout.removeAttribute("data-theater");
    }

    return () => layout.removeAttribute("data-theater");
  }, [theaterMode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncProgressState = (totalDuration: number) => {
      const percent = getProgressPercentage(watchedTimeRef.current, totalDuration);
      setWatchedTime(watchedTimeRef.current);
      setProgressPercent(percent);
      notifyVideoProgressUpdate(VIDEO_SRC, percent);
    };

    const syncPlaybackUi = () => {
      const totalDuration = readVideoDuration(video);
      const time = video.currentTime;

      setCurrentTime(time);
      if (!isDraggingSeekRef.current && totalDuration > 0) {
        setSeekValue((time / totalDuration) * 100);
      }
    };

    const persistProgress = (force = false) => {
      const watchedDelta = watchedTimeRef.current - lastPersistedWatchedRef.current;
      if (!force && watchedDelta < PROGRESS_SAVE_INTERVAL) return;

      const totalDuration = readVideoDuration(video);
      const progressPercent = getProgressPercentage(
        watchedTimeRef.current,
        totalDuration,
      );

      saveVideoProgress(VIDEO_SRC, {
        watchedTime: watchedTimeRef.current,
        playbackTime: playbackTimeRef.current,
        progressPercent,
        duration: totalDuration > 0 ? totalDuration : undefined,
      });

      lastPersistedWatchedRef.current = watchedTimeRef.current;
      syncProgressState(totalDuration);
    };

    const restoreProgress = () => {
      const totalDuration = readVideoDuration(video);
      if (totalDuration > 0) setDuration(totalDuration);

      const saved = loadVideoProgress(VIDEO_SRC);
      watchedTimeRef.current = saved.watchedTime;
      playbackTimeRef.current = saved.playbackTime;
      lastPersistedWatchedRef.current = saved.watchedTime;
      lastTickTimeRef.current = saved.playbackTime;

      if (saved.playbackTime > 0 && saved.playbackTime < totalDuration) {
        video.currentTime = saved.playbackTime;
      }

      syncProgressState(totalDuration);
      syncPlaybackUi();
    };

    const onLoadedMetadata = () => {
      const totalDuration = readVideoDuration(video);
      if (totalDuration > 0) setDuration(totalDuration);
      restoreProgress();
    };

    const onDurationChange = () => {
      const totalDuration = readVideoDuration(video);
      if (totalDuration > 0) {
        setDuration(totalDuration);
        syncProgressState(totalDuration);
        syncPlaybackUi();
      }
    };

    const onPlay = () => setPlaying(true);

    const onPause = () => {
      setPlaying(false);
      if (!isSeekingRef.current && !video.seeking) {
        persistProgress(true);
      }
    };

    const onSeeking = () => {
      isSeekingRef.current = true;
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      lastTickTimeRef.current = video.currentTime;
      syncPlaybackUi();
    };

    const onTimeUpdate = () => {
      syncPlaybackUi();

      if (isSeekingRef.current || video.seeking) return;

      const time = video.currentTime;
      const previousTime = lastTickTimeRef.current;
      const totalDuration = readVideoDuration(video);

      if (isOrganicPlaybackStep(previousTime, time)) {
        const delta = time - previousTime;
        watchedTimeRef.current += delta;
        playbackTimeRef.current = time;
        syncProgressState(totalDuration);
        persistProgress();
      }

      lastTickTimeRef.current = time;
    };


    const onEnded = () => {
      const totalDuration = readVideoDuration(video);
      if (totalDuration > 0) {
        watchedTimeRef.current = Math.max(watchedTimeRef.current, totalDuration);
        playbackTimeRef.current = totalDuration;
      }
      persistProgress(true);
      syncProgressState(totalDuration);
      syncPlaybackUi();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncFullscreen = () => setFullscreen(isVideoFullscreen(video));

    document.addEventListener("fullscreenchange", syncFullscreen);
    video.addEventListener("webkitbeginfullscreen", syncFullscreen);
    video.addEventListener("webkitendfullscreen", syncFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      video.removeEventListener("webkitbeginfullscreen", syncFullscreen);
      video.removeEventListener("webkitendfullscreen", syncFullscreen);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let hideTimer: ReturnType<typeof setTimeout>;

    const bumpControls = () => {
      container.dataset.touchActive = "true";
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        delete container.dataset.touchActive;
      }, 500);
    };

    container.addEventListener("touchstart", bumpControls, { passive: true });
    container.addEventListener("touchmove", bumpControls, { passive: true });
    container.addEventListener("touchend", bumpControls, { passive: true });

    return () => {
      clearTimeout(hideTimer);
      container.removeEventListener("touchstart", bumpControls);
      container.removeEventListener("touchmove", bumpControls);
      container.removeEventListener("touchend", bumpControls);
    };
  }, []);

  async function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setMuted(true);
        try {
          await video.play();
        } catch {
          /* playback blocked */
        }
      }
    } else {
      video.pause();
    }
  }

  function handleSeekInput(value: number) {
    const video = videoRef.current;
    if (!video || duration <= 0) return;

    isDraggingSeekRef.current = true;
    setSeekValue(value);
    video.currentTime = (value / 100) * duration;
    setCurrentTime(video.currentTime);
  }

  function handleSeekEnd() {
    isDraggingSeekRef.current = false;
  }

  function handleVolumeChange(value: number) {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    setVolume(value);
    setMuted(value === 0);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleFullscreen() {
    const video = videoRef.current;
    if (!video) return;

    toggleVideoFullscreen(video, containerRef.current);
  }

  const wrapperClassName = theaterMode
    ? "w-full  max-w-none space-y-3"
    : "mx-auto w-full space-y-3";

  const playerClassName =
    "group relative aspect-video w-full overflow-hidden rounded-lg bg-black";

  return (
    <div className={wrapperClassName} data-theater={theaterMode ? "true" : "false"}>
      <div
        ref={containerRef}
        className={playerClassName}
        data-paused={playing ? "false" : "true"}
        data-touch-active="false"
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onClick={togglePlay}
          className="absolute inset-0 z-0 h-full w-full cursor-pointer object-cover"
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        />

        <div
          className={[
            "video-controls pointer-events-auto absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-8",
            "bg-linear-to-t from-black/80 via-black/40 to-transparent",
            "opacity-100 transition-opacity duration-200",
            "delay-500 md:opacity-0 md:delay-500",
            "md:group-hover:opacity-100 md:group-hover:delay-0",
            "md:group-focus-within:opacity-100 md:group-focus-within:delay-0",
            "group-data-[paused=true]:opacity-100 group-data-[paused=true]:delay-0",
            "group-data-[touch-active=true]:opacity-100 group-data-[touch-active=true]:delay-0",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={seekValue}
            onChange={(e) => handleSeekInput(Number(e.target.value))}
            onMouseUp={handleSeekEnd}
            onTouchEnd={handleSeekEnd}
            className="mb-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/30 accent-white md:h-1"
            aria-label="Seek"
          />

          <div className="flex items-center gap-2 text-white md:gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex size-11 items-center justify-center rounded transition-colors hover:bg-white/20 active:bg-white/30"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <span className="min-w-24 text-xs tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleMute}
                className="flex size-11 items-center justify-center rounded transition-colors hover:bg-white/20 active:bg-white/30"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted || volume === 0 ? <MutedIcon /> : <VolumeIcon />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="h-1.5 w-16 cursor-pointer appearance-none rounded-full bg-white/30 accent-white md:h-1 md:w-20"
                aria-label="Volume"
              />
            </div>

            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheaterMode((prev) => !prev)}
                className="hidden md:flex size-11 items-center justify-center rounded transition-colors hover:bg-white/20 active:bg-white/30"
                aria-label="Theater mode"
              >
                <TheaterIcon active={theaterMode} />
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex size-11 items-center justify-center rounded transition-colors hover:bg-white/20 active:bg-white/30"
                aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
