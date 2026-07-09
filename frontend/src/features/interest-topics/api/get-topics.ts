import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { Topic } from '@/types/api';

export const getTopics = async (): Promise<Topic[]> => {
  const response = await api.get('/interests/available_interests/');
  return response.data.data;
};

export const useTopics = () =>
  useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
    staleTime: 1000 * 60 * 30,
  });
