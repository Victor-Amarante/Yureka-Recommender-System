import { VideoPlayerContainer } from './VideoPlayerContainer';
import { YouTubeEmbed } from './YouTubeEmbed';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  start?: number;
}

export function VideoPlayer({ title, videoId, start }: VideoPlayerProps) {
  const {
    isReady,
    isExpanded,
    setIsExpanded,
    setIsReady,
    playerRef,
    opts,
    handleReady,
  } = useVideoPlayer({ start });

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
          aria-hidden="true"
        />
      )}

      <VideoPlayerContainer isExpanded={isExpanded}>
        <YouTubeEmbed
          videoId={videoId}
          title={title}
          opts={opts}
          onReady={handleReady}
          onPlay={() => setIsExpanded(true)}
          onPause={() => setIsExpanded(false)}
          onEnd={() => setIsExpanded(false)}
          isReady={isReady}
        />
      </VideoPlayerContainer>
    </>
  );
}
