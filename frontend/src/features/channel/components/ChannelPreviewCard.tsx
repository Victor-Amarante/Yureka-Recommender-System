import { Channel } from '../types/Channel';
import {
  formatCount,
  formatDateString,
  formatRelativeDate,
} from '@/utils/formats';
import { AuthorDetails } from './AuthorDetails';
import AuthorImage from '@/features/videos/components/AuthorImage';
import { FollowButton } from './FollowButton';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import Subtitle from '@/components/shared/Subtitle';
import { fakerPT_BR } from '@faker-js/faker';
import { LatestVideo } from './LatestVideo';
import { useIsFollowing } from '../hooks/useIsFollowing';
import { getSocialIcon } from '../utils/getSocialIcon';
import { Calendar, Eye } from 'lucide-react';
import { useChannelDetails } from '../../api/get-channel-details';

const mockChannel = {
  id: '12321',
  name: 'Arthur Miller',
  subscribers: 12400,
  about: 'vlog-ensaios e blablabla \n vídeos segunda, quarta e sexta',
  image_url:
    'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
  created_at: new Date('2023-01-01'),
  total_views: 123123,
  categories: ['Podcast', 'Conversa', 'Filosofia'],
  latest_videos: [
    {
      id: 'FYq86L1XqEM',
      thumbnail:
        'https://i.ytimg.com/vi/FYq86L1XqEM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAiQUlxqND_VE88K2g9w4WhjSI6Jg',
      title: 'Como vencer um profissional no xadrez em 24h (ou quase isso)',
      views: 1300,
    },
    {
      id: 'XJ5ObcTsTf4',
      thumbnail: 'https://i.ytimg.com/vi_webp/XJ5ObcTsTf4/maxresdefault.webp',
      title: 'o que acontece se voce parar??? | Pensando Alto #23',
      views: 12000,
    },
    {
      id: 'UeE0o51RvIs',
      thumbnail:
        'https://i.ytimg.com/vi/UeE0o51RvIs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClJXuiy8N1kxWdCUQYosG9kvqc4g',
      title: 'Pegamos o PRIMEIRO TREM pra uma cidade desconhecida',
      views: 11000,
    },
  ],
  social_links: [
    {
      type: 'twitch',
      url: 'asddasdasas',
    },
    {
      type: 'twitter',
      url: 'asddasdasas',
    },
    {
      type: 'instagram',
      url: 'asddasdasas',
    },
    {
      type: 'youtube',
      url: 'asddasdasas',
    },
  ],
};

export function ChannelPreviewCard({ ...props }: Channel) {
  const isFollowing = useIsFollowing('1');

  const {
    id,
    name,
    image_url,
    categories,
    about,
    social_links,
    latest_videos,
    total_views,
    created_at,
    subscribers,
  } = mockChannel;

  return (
    <div
      className={cn(
        'border border-purple-400/30 bg-black/90 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset]',
        'max-w-sm w-full h-full group overflow-y-scroll',
        'mx-auto p-4 rounded-xl',
        'flex flex-col gap-4',
      )}
    >
      <div className="flex flex-col flex-wrap justify-between items-start gap-6 mb-3">
        <div className="flex w-full items-center gap-2 flex-1 min-w-0">
          <AuthorImage
            channel_id={id}
            channel_name={name}
            src={image_url}
            size={30}
            className="rounded-md"
          />

          <div className="w-full flex items-end justify-between">
            <AuthorDetails
              channel_name={name}
              followers={2120}
              subscribers={60000}
            />

            <FollowButton isFollowing={isFollowing} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="text-xs text-gray-300 mb-4 whitespace-pre-line break-words">
            {about}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories?.map((category) => (
              <span
                key={category}
                className="px-2 py-1 rounded-full bg-purple-600/20 text-purple-400 text-xs"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <h4 className="text-sm font-semibold text-gray-200 mb-2">
          Últimos vídeos
        </h4>
        <div className="flex flex-col gap-3">
          {latest_videos
            ?.slice(0, 3)
            .map((video) => (
              <LatestVideo
                id={video.id}
                thumbnail_url={video.thumbnail}
                title={video.title}
                key={video.id}
              />
            ))}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-200 mb-2">
            Redes sociais
          </h4>
          <div className="flex flex-wrap gap-3">
            {social_links?.map((social) => (
              <a
                key={social.type}
                href={social.url}
                className="text-gray-400 hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(social.type)}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar size={14} className="shrink-0" />
            <span className="truncate">
              Criado em {formatDateString(new Date())}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Eye size={14} className="shrink-0" />
            <span className="truncate">
              {formatCount(total_views)} visualizações
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
