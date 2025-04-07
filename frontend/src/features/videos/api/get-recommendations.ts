import { AxiosResponse } from 'axios';
import { mockVideo, Video, VideosSchema } from '../types/Video';
import { VideosURLs } from './urls';
import { apiRequest } from '@/lib/api-request';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export const getRecommendations = async (): Promise<Video[]> => {
  await setTimeout(() => {}, 1000);

  const recommendations: Video[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Como criar uma API com Node.js e Express',
      description:
        'Neste tutorial, aprenda a criar uma API RESTful usando Node.js e Express do zero.',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: {
        id: 'ch1',
        name: 'Código Fonte TV',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 1420, // 23:40 em segundos
      views: 450000,

      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
    {
      id: 'Ke90Tje7VS0',
      title: 'Sobre o MEDO de mudar de opinião | Pensando Alto #24',
      description:
        'Aprenda os fundamentos do React e como construir sua primeira aplicação web moderna.',
      thumbnail:
        'https://i.ytimg.com/vi/q28GpC1RjtM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDIIrXdCb9H3YhpFwtvBLTRUByA7w',
      channel: {
        id: 'ch2',
        name: 'Arthur Miller',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 7200, // 2 horas em segundos
      views: 780000,

      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
    {
      id: 'BwuLxPH8IDs',
      title: 'TypeScript do Básico ao Avançado',
      description:
        'Neste vídeo, vamos explorar o TypeScript desde os conceitos básicos até técnicas avançadas.',
      thumbnail: 'https://i.ytimg.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
      channel: {
        id: 'ch3',
        name: 'Rocketseat',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 5400, // 1:30 horas em segundos
      views: 320000,

      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
    {
      id: 'T63nY70eZF0',
      title: 'Criando um E-commerce com Next.js 13',
      description:
        'Veja como desenvolver uma loja virtual completa usando Next.js 13, Tailwind e Prisma.',
      thumbnail: 'https://i.ytimg.com/vi/T63nY70eZF0/maxresdefault.jpg',
      channel: {
        id: 'ch4',
        name: 'Lucas Nhimi',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 8100, // 2:15 horas em segundos
      views: 185000,

      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
    {
      id: 'FYq86L1XqEM',
      thumbnail:
        'https://i.ytimg.com/vi/FYq86L1XqEM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAiQUlxqND_VE88K2g9w4WhjSI6Jg',
      title: 'Como vencer um profissional no xadrez em 24h (ou quase isso)',
      views: 1300,
      description:
        'Neste tutorial, aprenda a criar uma API RESTful usando Node.js e Express do zero.',
      channel: {
        id: 'ch1',
        name: 'Código Fonte TV',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 1420, // 23:40 em segundos
      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
    {
      id: 'XJ5ObcTsTf4',
      thumbnail:
        'https://i9.ytimg.com/vi/XJ5ObcTsTf4/hqdefault_custom_3.jpg?sqp=CND50L8G-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD3FrnHiJar5CbotqD9pGIJamD5ZA',
      title: 'o que acontece se voce parar??? | Pensando Alto #23',
      views: 12000,
      channel: {
        id: 'ch2',
        name: 'Filipe Deschamps',
        image_url:
          'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k',
      },
      duration: 7200, // 2 horas em segundos
      comments_count: 20,
      created_at: new Date('2023-01-01'),
      likes_count: 1000,
      publication_date: new Date('2023-01-01'),
    },
  ];

  // Adicionar os videos recomendados ao cache do React Query
  recommendations.forEach((video) => {
    queryClient.setQueryData(['recommendations', video.id], video);
  });

  return recommendations;

  // return apiRequest({
  //   method: 'get',
  //   endpoint: '/recommendations',
  //   responseSchema: VideosSchema.array(),
  // });
};

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendations,
    staleTime: 1000 * 60 * 10, // 10m
  });
}

export function useRecommendation(id: string) {
  return queryClient.getQueryData<Video>(['recommendations', id]);
}
