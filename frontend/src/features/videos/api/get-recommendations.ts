import { AxiosResponse } from 'axios';
import { mockVideo, Video, VideosSchema } from '../types/Video';
import { VideosURLs } from './urls';
import { apiRequest } from '@/lib/api-request';
import { useQuery } from '@tanstack/react-query';

export const getRecommendations = async (): Promise<Video[]> => {
  return Array(6).fill(mockVideo);

  return apiRequest({
    method: 'get',
    endpoint: '/recommendations',
    responseSchema: VideosSchema.array(),
  });
};

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 10, // 10m
  });
}
