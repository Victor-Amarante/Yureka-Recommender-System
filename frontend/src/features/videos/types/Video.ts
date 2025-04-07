import { z } from 'zod';
import { ChannelReducedSchema } from './ChannelReduced';
import { faker } from '@faker-js/faker';

export const VideosSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number(),
  thumbnail: z.string().optional(),
  views: z.number(),
  likes_count: z.number(),
  comments_count: z.number(),
  publication_date: z.date(),
  created_at: z.date(),
  channel: ChannelReducedSchema,
});

// Mock para o schema de vídeos
export const mockVideo = () => {
  return {
    id: 'FYq86L1XqEM',
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    duration: faker.number.int({ min: 60, max: 3600 }), // Between 1 min and 1 hour in seconds
    thumbnail: faker.image.urlLoremFlickr({
      category: 'nature',
      width: 640,
      height: 360,
    }),
    views: faker.number.int({ min: 100, max: 1000000 }),
    likes_count: faker.number.int({ min: 10, max: 50000 }),
    comments_count: faker.number.int({ min: 0, max: 10000 }),
    publication_date: faker.date.past(),
    created_at: faker.date.recent(),
    channel: {
      id: faker.string.uuid(),
      name: faker.company.name(),
      avatar: faker.image.avatar(),
      subscribers: faker.number.int({ min: 100, max: 10000000 }),
    },
  };
};

export type Video = z.infer<typeof VideosSchema>;
