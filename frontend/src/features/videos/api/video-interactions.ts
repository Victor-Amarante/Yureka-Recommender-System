import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { VideoComment } from '@/types/api';

export const getVideoDetails = async (videoId: string) => {
  const response = await api.get(`/video-interactions/${videoId}/details/`);
  return response.data.data;
};

export const getVideoComments = async (videoId: string): Promise<VideoComment[]> => {
  const response = await api.get(`/video-interactions/${videoId}/comments/`);
  return response.data.data ?? [];
};

export const likeVideo = async (videoId: string): Promise<{ liked: boolean }> => {
  const response = await api.post(`/video-interactions/${videoId}/like/`);
  return response.data.data;
};

export const postComment = async (videoId: string, content: string): Promise<VideoComment> => {
  const response = await api.post(`/video-interactions/${videoId}/comment/`, { content });
  return response.data.data;
};

export const useVideoDetails = (videoId: string) =>
  useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: !!videoId,
  });

export const useVideoComments = (videoId: string) =>
  useQuery({
    queryKey: ['video-comments', videoId],
    queryFn: () => getVideoComments(videoId),
    enabled: !!videoId,
  });

export const useLikeVideo = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likeVideo(videoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['video', videoId] }),
  });
};

export const usePostComment = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => postComment(videoId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['video-comments', videoId] }),
  });
};
