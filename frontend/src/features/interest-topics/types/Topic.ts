import { z } from 'zod';
import { faker } from '@faker-js/faker';

export const TopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const createMockTopic = (): z.infer<typeof TopicSchema> => ({
  id: faker.string.uuid(),
  name: faker.lorem.words({ min: 1, max: 2 }),
  description: faker.commerce.productDescription(),
});

export const createMockTopics = (
  count: number = 10,
): z.infer<typeof TopicSchema>[] =>
  Array.from({ length: count }, createMockTopic);

export type Topic = z.infer<typeof TopicSchema>;
