import Image from '@/components/shared/Image';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Video } from '../types/Video';
import formatVideoDuration from '../utils/formatVideoDuration';
import AuthorImage from './AuthorImage';
import VideoPreviewDetails from './VideoPreviewDetails';

export function VideoPreview({
  id,
  channel_id,
  channel_name,
  channel_image,
  duration,
  title,
  views,
  thumbnail,
  publication_date,
}: Video) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* background shadow */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          transform: isHovered
            ? 'translateY(12px) scale(0.95)'
            : 'translateY(0) scale(0.85)',
          opacity: isHovered ? 0.5 : 0,
          background: 'rgba(0,0,0,0.4)',
          filter: 'blur(10px)',
          zIndex: -1,
        }}
      />

      {/* background layer */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500"
        style={{
          transform: isHovered
            ? 'translateY(6px) scale(0.98)'
            : 'translateY(0) scale(1)',
          background: 'rgba(30,30,30,0.5)',
          zIndex: -1,
        }}
      />

      <div
        className="transition-all duration-300 rounded-2xl bg-transparent hover:bg-black/50"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        <div className="relative aspect-video rounded-t-lg mb-4">
          <Link to={`/watch/${id}`}>
            <Image src={thumbnail} alt={'Imagem do video'} />

            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatVideoDuration(duration)}
            </div>
          </Link>

          <AuthorImage
            className="bg-do absolute bottom-[-0.5rem] left-[-0.25rem] border-8 border-black"
            size={40}
            channel_name={channel_name}
            channel_id={channel_id}
            src={channel_image}
          />
        </div>

        <VideoPreviewDetails
          channel_name={'Manual coisa do mundo na argelia do norte'}
          channel_id={channel_id}
          video_id={id}
          title={title}
          publication_at={publication_date}
          views={views}
          key={id}
        />
      </div>
    </motion.div>
  );
}
