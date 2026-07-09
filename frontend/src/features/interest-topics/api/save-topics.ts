import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

export const saveTopics = async (topicIds: string[]): Promise<void> => {
  await api.post('/interests/update_user_interests/', { topic_ids: topicIds });
};

export const useSaveTopics = () =>
  useMutation({
    mutationFn: saveTopics,
  });
