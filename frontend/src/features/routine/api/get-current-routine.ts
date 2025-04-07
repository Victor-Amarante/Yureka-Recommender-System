import { apiRequest } from '@/lib/api-request';
import { useQuery } from '@tanstack/react-query';
import { Routine, RoutineSchema } from '../types/Routine';

export const getCurrentRoutine = async (): Promise<Routine> => {
  return apiRequest({
    method: 'get',
    endpoint: '/routines/current',
    responseSchema: RoutineSchema,
  });
};

export function useCurrentRoutine() {
  return useQuery({
    queryKey: ['routines', 'current'],
    queryFn: getCurrentRoutine,
    staleTime: 1000 * 60 * 10,
  });
}
