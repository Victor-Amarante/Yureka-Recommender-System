import { z } from "zod";

export const VideoTopicsSchema = z.object({
  id: z.string().uuid(),
  video_id: z.string(),
  topic_id: z.string().uuid(),
});
export type VideoTopic = z.infer<typeof VideoTopicsSchema>;
