import { useCallback, useEffect, useRef, useState } from 'react';
import { Options, YouTubePlayer } from 'youtube-player/dist/types';

interface UseVideoPlayerProps {
  start?: number;
}

export function useVideoPlayer({ start }: UseVideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const opts: Options = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      color: 'red',
      controls: 1,
      start,
      cc_lang_pref: 'pt',
      hl: 'pt',
      rel: 0,
      enablejsapi: 1,
    },
  };

  const handleReady = useCallback((event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setIsReady(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.code === 'Space' && playerRef.current) {
        event.preventDefault();
        if (!hasPlayed) {
          playerRef.current.playVideo();
          setHasPlayed(true);
        } else {
          const state = await playerRef.current.getPlayerState();
          if (state === 1) {
            playerRef.current.pauseVideo();
          } else {
            playerRef.current.playVideo();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasPlayed]);

  return {
    isReady,
    setIsReady,
    isExpanded,
    setIsExpanded,
    playerRef,
    opts,
    handleReady,
  };
}
