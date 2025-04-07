import { z } from 'zod';
import { faker } from '@faker-js/faker';
import {
  createMockTopic,
  TopicSchema,
} from '@/features/interest-topics/types/Topic';

export enum WEEK_DAYS {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export const TimeSchema = z
  .string()
  .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'Time must be in the format HH:mm:ss',
  });

export type Time = z.infer<typeof TimeSchema>;

export const RoutineSchema = z.object({
  id: z.string(),
  start_time: TimeSchema,
  end_time: TimeSchema,
  week_day: z.nativeEnum(WEEK_DAYS),
  topic: TopicSchema,
});

export type Routine = z.infer<typeof RoutineSchema>;

export const mockRoutine = (): Routine => {
  const weekDayValues = Object.values(WEEK_DAYS);

  const generateTime = () => {
    const hours = faker.number
      .int({ min: 0, max: 23 })
      .toString()
      .padStart(2, '0');
    const minutes = faker.number
      .int({ min: 0, max: 59 })
      .toString()
      .padStart(2, '0');
    const seconds = faker.number
      .int({ min: 0, max: 59 })
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return {
    id: faker.string.uuid(),
    start_time: generateTime(),
    end_time: generateTime(),
    week_day: faker.helpers.enumValue(WEEK_DAYS),
    topic: createMockTopic(),
  };
};

export const mockRoutines = (count: number = 5): Routine[] => {
  return Array.from({ length: count }, () => mockRoutine());
};
