import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { CuratedVideo } from '@/types/api';

import { Video } from '../types/Video';

const mapCuratedToVideo = (curated: CuratedVideo): Video => {
  const v = curated.video;
  return {
    id: v.id,
    title: v.title,
    description: v.description ?? undefined,
    duration: v.duration,
    thumbnail: v.thumbnail ?? undefined,
    views: v.views,
    likes_count: v.likes_count,
    comments_count: v.comments_count,
    publication_date: v.publication_date ? new Date(v.publication_date) : new Date(),
    created_at: new Date(),
    channel: {
      id: v.channel?.id ?? '',
      name: v.channel?.name ?? '',
      image_url: v.channel?.image_url ?? '',
      subscribers: v.channel?.subscribers ?? 0,
    },
  };
};

export const getRecommendations = async (): Promise<Video[]> => {
  const response = await api.get('/recommendations/get_recommendations/');
  const curated: CuratedVideo[] = response.data.data ?? [];
  return curated.map(mapCuratedToVideo);
};

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 10,
  });
}
