import VideoPreview from './VideoPreview';

export default function Feed() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {...Array(6)
        .fill(0)
        .map((_, i) => <VideoPreview key={i} />)}
    </div>
  );
}
