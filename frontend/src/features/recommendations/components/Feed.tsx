import { VideoPreview } from './VideoPreview';

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
          .map((_, i) => <VideoPreview key={i} />)}
      </div>
    </div>
  );
}
