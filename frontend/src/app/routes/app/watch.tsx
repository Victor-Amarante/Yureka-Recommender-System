import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChannelPreviewCard } from '@/features/channel/components/ChannelPreviewCard';
import AuthorImage from '@/features/videos/components/AuthorImage';
import { VideoPlayer } from '@/features/videos/components/VideoPlayer/VideoPlayer';
import { fakerPT_BR } from '@faker-js/faker';
import {
  Flag,
  MessageSquare,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [activeTab, setActiveTab] = useState('comments');
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [currentVideo, setCurrentVideo] = useState({
    id: videoId,
    title: 'Como a Inteligência Artificial está Transformando a Educação',
    creator: 'Tech Insights',
    creatorAvatar: '/placeholder.svg?height=40&width=40',
    views: '12.5K',
    likes: 1250,
    dislikes: 45,
    publishedAt: '2 dias atrás',
    description:
      'Neste vídeo, exploramos como a inteligência artificial está revolucionando o setor educacional, desde salas de aula personalizadas até sistemas de tutoria adaptativa. Discutimos as tecnologias emergentes, casos de uso reais e o futuro da educação impulsionado pela IA.\n\nTópicos abordados:\n- Sistemas de aprendizado adaptativo\n- IA para avaliação automática\n- Assistentes virtuais para estudantes\n- Desafios éticos e preocupações\n- O futuro da educação com IA',
    tags: ['Tecnologia', 'Educação', 'Inteligência Artificial', 'Futuro'],
    isSubscribed: false,
    subscriberCount: '245K',
  });

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Ana Silva',
      avatar: '/placeholder.svg?height=32&width=32',
      content:
        'Excelente vídeo! Estou usando algumas dessas tecnologias de IA na minha sala de aula e os resultados têm sido impressionantes.',
      time: '1 dia atrás',
      likes: 42,
      replies: 3,
    },
    {
      id: 2,
      user: 'Carlos Mendes',
      avatar: '/placeholder.svg?height=32&width=32',
      content:
        'Gostaria de saber mais sobre as preocupações éticas. Como podemos garantir que a IA não aumente a desigualdade educacional?',
      time: '23 horas atrás',
      likes: 28,
      replies: 5,
    },
    {
      id: 3,
      user: 'Mariana Costa',
      avatar: '/placeholder.svg?height=32&width=32',
      content:
        'Implementamos um sistema de tutoria por IA na nossa escola no ano passado. Houve uma curva de aprendizado, mas agora os professores adoram como isso libera tempo para interações mais significativas com os alunos.',
      time: '12 horas atrás',
      likes: 17,
      replies: 1,
    },
  ]);

  const toggleSubscription = () => {
    setCurrentVideo((prev) => ({
      ...prev,
      isSubscribed: !prev.isSubscribed,
      subscriberCount: prev.isSubscribed
        ? (Number.parseInt(prev.subscriberCount.replace('K', '000')) - 1000) /
            1000 +
          'K'
        : (Number.parseInt(prev.subscriberCount.replace('K', '000')) + 1000) /
            1000 +
          'K',
    }));
  };

  return (
    <div className="w-full relative min-h-screen">
      <div className="container max-w-full mx-auto px-0 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-full">
          <div className="lg:col-span-3 space-y-4 w-full">
            <VideoPlayer title={currentVideo.title} videoId={'q28GpC1RjtM'} />
          </div>

          <ChannelPreviewCard
            followers={1000}
            id="1"
            name="Art Guy"
            subscribers={12400}
            about={'vlog-ensaios e blablabla \n vídeos segunda, quarta e sexta'}
            image_url={
              'https://yt3.googleusercontent.com/MbehocmcGccQd_uRFgSSsfydV2w8GuUPfe4k4fOk4Y0T39_qB7vCK_tfx26EOSg2cnanc3_9n8k=s160-c-k-c0x00ffffff-no-rj'
            }
            created_at={new Date('2023-01-01')}
            total_views={123123}
            categories={['Podcast', 'Conversa', 'Filosofia']}
            latest_videos={[
              {
                id: '123',
                thumbnail: fakerPT_BR.image.urlPicsumPhotos(),
                title: 'title test',
                views: 12312312,
              },
              {
                id: '12323',
                thumbnail: fakerPT_BR.image.urlPicsumPhotos(),
                title: 'title test',
                views: 12312312,
              },
              {
                id: '1233',
                thumbnail: fakerPT_BR.image.urlPicsumPhotos(),
                title: 'title test',
                views: 12312312,
              },
            ]}
            social_links={[
              {
                type: 'twitch',
                url: 'asddasdasas',
              },
            ]}
          />

          <div className="space-y-4 lg:col-span-3">
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {currentVideo.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-800 rounded-full">
                  <Button
                    variant="ghost"
                    className="rounded-none px-3 py-2 text-white hover:bg-gray-700 flex items-center"
                  >
                    <ThumbsUp className="h-5 w-5 mr-1" />
                    <span>{currentVideo.likes}</span>
                  </Button>
                  <div className="h-5 w-px bg-gray-700"></div>
                  <Button
                    variant="ghost"
                    className="rounded-none px-3 py-2 text-white hover:bg-gray-700"
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="text-white hover:bg-gray-800 rounded-full"
                >
                  <Share2 className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </Button>

                <Button
                  variant="ghost"
                  className="text-white hover:bg-gray-800 rounded-full"
                >
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center space-x-4 mb-2">
                <p className="text-white text-sm">
                  {currentVideo.views} visualizações
                </p>
                <p className="text-white text-sm">{currentVideo.publishedAt}</p>
              </div>

              <div className="space-y-2">
                <p className="text-gray-300 whitespace-pre-line break-words">
                  {currentVideo.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {currentVideo.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full bg-red"></div>
        </div>
      </div>
    </div>
  );
}
