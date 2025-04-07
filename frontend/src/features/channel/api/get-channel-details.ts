import { apiRequest } from '@/lib/api-request';
import { useQuery } from '@tanstack/react-query';
import { Channel, ChannelSchema } from '../types/Channel';

export const getChannelDetails = async (
  channelId: string,
): Promise<Channel> => {
  return apiRequest({
    method: 'get',
    endpoint: `/channel/${channelId}`,
    responseSchema: ChannelSchema,
  });
};

export function useChannelDetails(channelId: string) {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannelDetails(channelId),
    staleTime: 1000 * 60 * 10,
  });
}
