import Divider from '@/components/shared/Divider';
import Subtitle from '@/components/shared/Subtitle';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, EllipsisVertical, Eye } from 'lucide-react';
import { Link } from 'react-router';
import formatViews from '../utils/formatViews';

interface VideoPreviewDetailsProps {
  title: String;
  channel_name: string;
  channel_id: string;
  video_id: string;
  publication_at: Date;
  views: number;
}

export default function VideoPreviewDetails({
  title,
  channel_name,
  channel_id,
  video_id,
  publication_at,
  views,
}: VideoPreviewDetailsProps) {
  return (
    <div className="px-2 py-2 justify-start">
      <div className="flex flex-row items-start justify-between">
        <Link to={`/watch/${video_id}`}>
          <h3
            className="text-white font-medium text-lg line-clamp-2 mb-2"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {title}
          </h3>
        </Link>

        <button className="text-gray-400 cursor-pointer hover:text-white transition-colors pt-1">
          <EllipsisVertical className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center min-w-0">
        <Link to={`/channel/${channel_id}`} className="truncate max-w-[40%]">
          <Subtitle className="text-white truncate">{channel_name}</Subtitle>
        </Link>
        <Divider />
        <div className="flex items-center min-w-0">
          <Clock className="w-4 h-4 text-gray-400" />
          <Subtitle className="ml-1 truncate">
            {formatDistanceToNow(new Date(publication_at), {
              includeSeconds: false,
              addSuffix: false,
              locale: ptBR,
            })
              .replace('cerca de ', '')
              .replace('aproximadamente ', '')}
          </Subtitle>
        </div>
        <Divider />
        <div className="flex items-center">
          <Eye className="w-4 h-4 text-gray-400" />
          <Subtitle className="ml-1">{formatViews(views)}</Subtitle>
        </div>
      </div>
    </div>
  );
}
