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
import { useEffect, useRef, useState } from "react";
import "./course-video-player.css";
import { formatTime, readVideoDuration } from "@/utils/functions";

const DEMO_SRC = "/videos/demo-video.mp4";

type ControlsProps = {
  playing: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  fullscreen: boolean;
  theaterMode: boolean;
  onTogglePlay: () => void;
  onSeek: (pct: number) => void;
  onVolumeChange: (val: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onToggleTheater: () => void;
};

function Controls({
  playing,
  progress,
  currentTime,
  duration,
  volume,
  muted,
  fullscreen,
  theaterMode,
  onTogglePlay,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleFullscreen,
  onToggleTheater,
}: ControlsProps) {
  return (
    <div className="video-controls" onClick={(e) => e.stopPropagation()}>
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={progress}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="video-controls__seek"
      />

      <div className="video-controls__row">
        <button
          type="button"
          onClick={onTogglePlay}
          className="video-controls__btn"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <span className="video-controls__time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <div className="video-controls__volume">
          <button
            type="button"
            onClick={onToggleMute}
            className="video-controls__btn"
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
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="video-controls__volume-slider"
          />
        </div>

        <div className="video-controls__actions">
          <button
            type="button"
            onClick={onToggleTheater}
            className="video-controls__btn"
            aria-label="Theater mode"
          >
            <TheaterIcon active={theaterMode} />
          </button>
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="video-controls__btn"
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {fullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

type VideoPlayerProps = {
  src?: string;
};

function VideoPlayer({ src = DEMO_SRC }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const durationRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    durationRef.current = 0;
    setDuration(0);
    setCurrentTime(0);
    setProgress(0);

    const syncDuration = () => {
      const next = readVideoDuration(video);
      if (next <= 0) return;

      if (
        durationRef.current === 0 &&
        video.currentTime > 0 &&
        next <= video.currentTime + 1
      ) {
        return;
      }

      if (next > durationRef.current) {
        durationRef.current = next;
        setDuration(next);
      }
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const total = durationRef.current || readVideoDuration(video);
      if (total > 0) {
        setProgress((video.currentTime / total) * 100);
      }
    };
    const onEnded = () => setPlaying(false);

    syncDuration();

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", syncDuration);
    video.addEventListener("loadeddata", syncDuration);
    video.addEventListener("durationchange", syncDuration);
    video.addEventListener("canplay", syncDuration);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("loadeddata", syncDuration);
      video.removeEventListener("durationchange", syncDuration);
      video.removeEventListener("canplay", syncDuration);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
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

  function handleSeek(pct: number) {
    const video = videoRef.current;
    if (!video) return;

    const total = durationRef.current || readVideoDuration(video);
    if (total <= 0) return;

    video.currentTime = (pct / 100) * total;
    setProgress(pct);
    setCurrentTime(video.currentTime);
  }

  function handleVolumeChange(val: number) {
    const video = videoRef.current;
    if (!video) return;

    video.volume = val;
    setVolume(val);
    setMuted(val === 0);
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      void containerRef.current?.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  }

  const playerClassName = theaterMode
    ? "video-player video-player--theater rounded-md"
    : "video-player rounded-md";

  return (
    <div
      ref={containerRef}
      className={playerClassName}
      data-paused={playing ? "false" : "true"}
      
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="auto"
        onClick={togglePlay}
        className="video-player__video"
      />
      <Controls
        playing={playing}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        muted={muted}
        fullscreen={fullscreen}
        theaterMode={theaterMode}
        onTogglePlay={togglePlay}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={toggleMute}
        onToggleFullscreen={toggleFullscreen}
        onToggleTheater={() => setTheaterMode((p) => !p)}
      />
    </div>
  );
}

export default function CourseVideoPlayer() {
  return <VideoPlayer />;
}
