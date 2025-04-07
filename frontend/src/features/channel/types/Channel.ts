import { z } from 'zod';
import { LatestVideo } from '../components/LatestVideo';

export const SocialLinkSchema = z.object({
  type: z.enum(['youtube', 'twitter', 'instagram', 'twitch']),
  url: z.string().url(),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;

export const LatestVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  views: z.number().int().nonnegative(),
});

export type LatestVideo = z.infer<typeof LatestVideoSchema>;

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  about: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  subscribers: z.number().int().nonnegative(),
  followers: z.number().int().nonnegative(),
  created_at: z.date().optional(),
  total_views: z.number().int().nonnegative(),
  latest_videos: LatestVideoSchema.array(),
  social_links: SocialLinkSchema.array(),
  categories: z.string().array(),
});

export type Channel = z.infer<typeof ChannelSchema>;
