export type BaseEntity = {
  id: string;
  createdAt?: number;
};

export type Comment = {
  id: string;
  content: string;
  author?: { id: string };
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
};

export type AuthResponse = {
  access: string;
  refresh: string;
  user: User;
};

export type Topic = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type Channel = {
  id: string;
  name: string;
  about: string | null;
  image_url: string | null;
  subscribers: number;
  followers: number;
};

export type Video = {
  id: string;
  title: string;
  thumbnail: string | null;
  description: string | null;
  duration: number;
  channel: Channel | null;
  views: number;
  likes_count: number;
  comments_count: number;
  publication_date: string | null;
};

export type CuratedVideo = {
  id: string;
  video: Video;
  approved_at: string | null;
};

export type VideoComment = {
  id: string;
  user: User;
  content: string;
  created_at: string;
};

export type Routine = {
  id: string;
  start_time: string;
  end_time: string;
  week_day: string;
  topic: Topic;
};
