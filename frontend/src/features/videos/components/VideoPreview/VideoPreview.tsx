import Image from '@/components/shared/Image';
import { paths } from '@/config/paths';
import { Clock } from 'lucide-react';
import { Link } from 'react-router';
import VideoPreviewDetails from './VideoPreviewDetails';
import { Video } from '../../types/Video';
import formatVideoDuration from '../../utils/formatVideoDuration';
import AuthorImage from '../AuthorImage';

export function VideoPreview({
  id,
  channel,
  duration,
  title,
  views,
  thumbnail,
  publication_date,
}: Video) {
  return (
    <div className="group shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 p-4 transition duration-200 hover:shadow-xl border-white/[0.2] bg-black shadow-none">
      <div className="relative aspect-video rounded-t-lg mb-4">
        <Link to={paths.app.watch.getHref(id)}>
          <Image src={thumbnail} alt={'Imagem do video'} />

          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatVideoDuration(duration)}
          </div>
        </Link>

        <AuthorImage
          className="bg-do absolute bottom-[-0.5rem] left-[-0.25rem] border-8 border-black"
          size={40}
          channel_name={channel.name}
          channel_id={channel.id}
          src={channel.image_url}
        />
      </div>

      <div className="group-hover:translate-x-2 px-2 transition-transform duration-200">
        <VideoPreviewDetails
          channel_name={channel.name}
          channel_id={channel.id}
          video_id={id}
          title={title}
          publication_at={publication_date}
          views={views}
          key={id}
        />
      </div>
    </div>
  );
}
