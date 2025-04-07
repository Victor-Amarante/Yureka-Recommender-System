import AuthorImage from '@/features/videos/components/AuthorImage';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';

interface CommentProps {
  id: string;
  image_url: string;
  channel_name: string;
  channel_id: string;
  time: string;
  content: string;
  likes: number;
  replies: number;
}

export function Comment({
  channel_id,
  channel_name,
  image_url,
  content,
  id,
  likes,
  replies,
  time,
}: CommentProps) {
  return (
    <div key={id} className="flex space-x-3">
      <AuthorImage
        channel_id={channel_id}
        src={image_url}
        channel_name={channel_name}
      />

      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="text-white font-medium">{channel_name}</h4>
          <span className="text-gray-400 text-xs">{time}</span>
        </div>

        <p className="text-gray-300 mt-1">{content}</p>

        <div className="flex items-center space-x-4 mt-2">
          <button className="text-gray-400 hover:text-white text-sm flex items-center space-x-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </button>

          <button className="text-gray-400 hover:text-white text-sm flex items-center space-x-1">
            <ThumbsDown className="h-4 w-4" />
          </button>

          <button className="text-gray-400 hover:text-white text-sm">
            Responder
          </button>

          {replies > 0 && (
            <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>{replies} respostas</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
