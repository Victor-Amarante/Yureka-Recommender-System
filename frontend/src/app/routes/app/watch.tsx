import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChannelPreviewCard } from '@/features/channel/components/ChannelPreviewCard';
import AuthorImage from '@/features/videos/components/AuthorImage';
import { VideoPlayer } from '@/features/videos/components/VideoPlayer/VideoPlayer';
import { cn } from '@/lib/utils';
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
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
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
            <div className="w-full flex justify-between">
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                Como identificar gente chata
              </h1>

              <Button
                variant="ghost"
                className="text-white hover:bg-gray-800 rounded-full"
              >
                <Flag className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-800 rounded-full">
                  <button
                    className="transition-colors hover:text-gray-600 rounded-none px-3 py-2 text-white"
                    onClick={() => {
                      setIsLiked(!isLiked);
                      setIsDisliked(false);
                    }}
                  >
                    <ThumbsUp
                      className={cn('h-5 w-5 mr-1', { 'fill-white': isLiked })}
                    />
                  </button>
                  <div className="h-5 w-px bg-gray-700"></div>
                  <button
                    className="transition-colors hover:text-gray-600 rounded-none px-3 py-2 text-white"
                    onClick={() => {
                      setIsDisliked(!isDisliked);
                      setIsLiked(false);
                    }}
                  >
                    <ThumbsDown
                      className={cn('h-5 w-5 mr-1', {
                        'fill-white': isDisliked,
                      })}
                    />
                  </button>
                </div>
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
                  {`
                Pra virar membro do canal é só usar esse link aqui:
                / @oarthurmiller

                Virando membro você tem acesso a:
                • Podcast exclusivo ao vivo e acesso a todos episódios que já rolaram;
                alguns dos convidados que já passaram por lá: Load Comics, Felipe Barbieri, Tiago (Tira do Papel), Matheus de Souza (Passageiro), Jonny Viccari... e MUITO MAIS.
                • Lives toda sexta trocando referências, conversando com os membros e assistindo coisas legais;
                • Vídeos extras (vlogs, reacts, aulas e o que mais me der na telha)

                _______________________________________________

                Me segue no Instagram :)
                / arthurrmiller

                _______________________________________________

                Em um futuro breve vão rolar encontros/aulões/imersões sobre criatividade: storytelling, roteiro, edição...
                Se tu tiver interesse, preenche esse forms aqui:
                https://docs.google.com/forms/d/1Q-SG...

                *Isso não é uma lista de espera — mas as turmas dos encontros vão ser pequenas, 10-15 pessoas no MÁXIMO.
                Então quem preencher o formulário, além da prioridade na fila, vai ganhar um descontão como agradecimento por ter respondido as perguntas!

                _______________________________________________

                Se tu gosta do Pensando Alto, se inscreve também na minha newsletter!
                Textos novos toda semana :)
                https://oarthurmiller.substack.com/

                _______________________________________________

                Canal da Nati:
                (ela faz vlog da nossa vida aqui em Amsterdam)
                eu também apareço por lá de vez em quando!
                / @natipompeu

                _______________________________________________

                Quer usar as mesmas músicas que eu uso nos meus vídeos?
                Use o Epidemic Sounds — nesse link você consegue 30 DIAS DE MÚSICA GRÁTIS:
                https://share.epidemicsound.com/39hw3n
                `}
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
