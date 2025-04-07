import YouTube from 'react-youtube';
import { cn } from '@/lib/utils';
import { Options, YouTubePlayer } from 'youtube-player/dist/types';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  opts: Options;
  isReady: boolean;
  onReady: (event: { target: YouTubePlayer }) => void;
  onPlay: () => void;
  onPause: () => void;
  onEnd: () => void;
}

export function YouTubeEmbed({
  videoId,
  title,
  opts,
  isReady,
  onReady,
  onPlay,
  onPause,
  onEnd,
}: YouTubeEmbedProps) {
  return (
    <YouTube
      videoId={videoId}
      title={title}
      opts={opts}
      className="absolute top-0 left-0 w-full h-full"
      iframeClassName={cn(
        'w-full h-full rounded-xl transition-opacity duration-500',
        {
          'opacity-0': !isReady,
          'opacity-100': isReady,
        },
      )}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onEnd={onEnd}
      loading="eager"
    />
  );
}
