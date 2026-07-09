import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

export type CreateRoutineInput = {
  topic: string;
  week_day: string;
  start_time: string;
  end_time: string;
};

export const createRoutine = async (data: CreateRoutineInput): Promise<void> => {
  await api.post('/routines/register_routine/', data);
};

export const useCreateRoutine = () =>
  useMutation({
    mutationFn: createRoutine,
  });
