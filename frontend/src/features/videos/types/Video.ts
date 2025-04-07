import { z } from "zod";

export const VideosSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.number(),
  thumbnail: z.string().optional(),
  channel_id: z.string(),
  channel_name: z.string(),
  channel_image: z.string(),
  views: z.number().default(0),
  likes_count: z.number().default(0),
  comments_count: z.number().default(0),
  publication_date: z.date(),
  created_at: z.date(),
});


export type Video = z.infer<typeof VideosSchema>;