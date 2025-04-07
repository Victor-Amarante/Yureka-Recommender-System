import { z } from 'zod';

export const ChannelReducedSchema = z.object({
  id: z.string(),
  name: z.string(),
  image_url: z.string().optional(),
});

export type ChannelReduced = z.infer<typeof ChannelReducedSchema>;
