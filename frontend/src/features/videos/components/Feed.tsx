import { mockVideo } from '../types/Video';
import { VideoPreview } from './VideoPreview/VideoPreview';
import { useRecommendations } from '../api/get-recommendations';
import { VideoPreviewSkeletons } from './VideoPreview/VideoPreviewSkeletons';
import { AsyncStateHandler } from '@/components/shared/AsyncStateHandler';

export function Feed() {
  const { data, isLoading, isError, refetch } = useRecommendations();

  return (
    <div className="flex flex-col gap-10 my-20 size-full">
      <div className="font-outfit text-white flex flex-col gap-2">
        <h2 className="text-5xl font-bold">Viagem e Cultura</h2>
        <span className="text-neutral-300">
          Conteúdos selecionados para você
        </span>
      </div>

      <AsyncStateHandler
        isLoading={isLoading}
        isError={isError}
        data={data}
        skeleton={<VideoPreviewSkeletons />}
        errorMessage="Não foi possível carregar os vídeos solicitados. "
        handleRetry={refetch}
        render={(videos) => (
          <div className="size-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoPreview key={video.id} {...video} />
            ))}
          </div>
        )}
      />
    </div>
  );
}
