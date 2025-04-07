import { faker } from '@faker-js/faker';
import { Video } from '../types/Video';
import { VideoPreview } from './VideoPreview';

export const mockVideo: Video = {
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 100, max: 1000 }),
  thumbnail: faker.image.url({
    height: 400,
    width: 711,
  }),
  channel_id: faker.string.uuid(),
  channel_image: faker.image.avatar(),
  channel_name: faker.internet.username(),
  views: faker.number.int({ min: 0, max: 10000 }),
  likes_count: faker.number.int({ min: 0, max: 10000 }),
  comments_count: faker.number.int({ min: 0, max: 10000 }),
  publication_date: faker.date.recent(),
  created_at: faker.date.recent(),
};

export function Feed() {
  return (
    <div className="flex flex-col gap-10">
      <div className="font-outfit text-white flex flex-col gap-2">
        <h2 className="text-5xl font-bold">Viagem e Cultura</h2>
        <span className="text-neutral-300">
          Conteúdos selecionados para você
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {...Array(6)
          .fill(0)
          .map((_, i) => <VideoPreview {...mockVideo} key={i} />)}
      </div>
    </div>
  );
}
