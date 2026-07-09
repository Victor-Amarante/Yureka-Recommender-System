import { useState } from 'react';
import { useParams } from 'react-router';
import { ThumbsUp, ThumbsDown, Share2, Flag, Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChannelPreviewCard } from '@/features/channel/components/ChannelPreviewCard';
import { VideoPlayer } from '@/features/videos/components/VideoPlayer/VideoPlayer';
import {
  useVideoDetails,
  useVideoComments,
  useLikeVideo,
  usePostComment,
} from '@/features/videos/api/video-interactions';

export default function WatchPage() {
  const { id: videoId } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);

  const { data: video, isLoading: videoLoading } = useVideoDetails(videoId!);
  const { data: comments = [], isLoading: commentsLoading } = useVideoComments(videoId!);
  const { mutate: like } = useLikeVideo(videoId!);
  const { mutateAsync: postComment, isPending: postingComment } = usePostComment(videoId!);

  const handleLike = () => {
    like(undefined, { onSuccess: (data) => setLiked(data.liked) });
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    await postComment(commentText.trim());
    setCommentText('');
  };

  if (videoLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">Carregando...</div>
    );
  }

  const channel = video?.channel;

  return (
    <div className="w-full min-h-screen">
      <div className="container max-w-full mx-auto px-0 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Player */}
          <div className="lg:col-span-3 space-y-4">
            <VideoPlayer title={video?.title ?? ''} videoId={videoId!} />
          </div>

          {/* Canal */}
          {channel && (
            <ChannelPreviewCard
              id={channel.id}
              name={channel.name}
              about={channel.about ?? ''}
              image_url={channel.image_url ?? ''}
              subscribers={channel.subscribers}
              followers={channel.followers}
              categories={[]}
              latest_videos={[]}
              social_links={[]}
              created_at={new Date()}
              total_views={0}
            />
          )}

          {/* Info do vídeo */}
          <div className="space-y-4 lg:col-span-3">
            <h1 className="text-2xl font-bold text-white">{video?.title}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                <Button
                  variant="ghost"
                  onClick={handleLike}
                  className={`rounded-none px-4 py-2 flex items-center gap-1 ${liked ? 'text-blue-400' : 'text-white'} hover:bg-gray-700`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{video?.likes_count ?? 0}</span>
                </Button>
                <div className="h-5 w-px bg-gray-700" />
                <Button variant="ghost" className="rounded-none px-4 py-2 text-white hover:bg-gray-700">
                  <ThumbsDown className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="ghost" className="text-white hover:bg-gray-800 rounded-full gap-1">
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-gray-800 rounded-full">
                <Flag className="h-5 w-5" />
              </Button>
            </div>

            {video?.description && (
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-300 whitespace-pre-line">{video.description}</p>
              </div>
            )}

            {/* Comentários */}
            <div className="space-y-4 pt-4">
              <h2 className="text-white font-semibold text-lg">
                Comentários ({video?.comments_count ?? 0})
              </h2>

              {/* Input novo comentário */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleComment()}
                    placeholder="Adicione um comentário..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder:text-zinc-500 outline-none focus:border-zinc-500"
                  />
                  <Button
                    onClick={handleComment}
                    disabled={!commentText.trim() || postingComment}
                    size="icon"
                    className="bg-white text-zinc-950 hover:bg-zinc-200"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Lista de comentários */}
              {commentsLoading ? (
                <p className="text-zinc-400 text-sm">Carregando comentários...</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{comment.user?.name?.[0] ?? 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white text-sm font-medium">{comment.user?.name}</p>
                        <p className="text-zinc-300 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  {comments.length === 0 && (
                    <p className="text-zinc-500 text-sm">Seja o primeiro a comentar.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
