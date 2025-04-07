import { z } from 'zod';
import { RoutineSchema, WEEK_DAYS } from '../types/Routine';

/**
 * Verifies if the current day matches the routine's week_day and
 * if the current time is between the routine's start_time and end_time
 */
export const isRoutineActiveNow = (
  routine: z.infer<typeof RoutineSchema>,
): boolean => {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 is Sunday, 1 is Monday, etc.

  const dayMap: Record<number, WEEK_DAYS> = {
    0: WEEK_DAYS.SUNDAY,
    1: WEEK_DAYS.MONDAY,
    2: WEEK_DAYS.TUESDAY,
    3: WEEK_DAYS.WEDNESDAY,
    4: WEEK_DAYS.THURSDAY,
    5: WEEK_DAYS.FRIDAY,
    6: WEEK_DAYS.SATURDAY,
  };

  const currentDay = dayMap[currentDayIndex];

  if (currentDay !== routine.week_day) {
    return false;
  }

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return currentTime >= routine.start_time && currentTime <= routine.end_time;
};
