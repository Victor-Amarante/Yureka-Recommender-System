import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Search, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryDrawer({ isOpen, onClose }: HistoryDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'h1',
      title: 'Como a Inteligência Artificial está Transformando a Educação',
      thumbnail: '/placeholder.svg?height=60&width=100',
      creator: 'Tech Insights',
      watchedAt: 'Hoje, 14:25',
      progress: 75, // porcentagem assistida
      videoId: 'v1',
    },
    {
      id: 'h2',
      title: 'Ferramentas de IA para Educadores: Um Guia Prático',
      thumbnail: '/placeholder.svg?height=60&width=100',
      creator: 'Tech Insights',
      watchedAt: 'Hoje, 10:15',
      progress: 100,
      videoId: 'v2',
    },
    {
      id: 'h3',
      title: 'O Futuro da Aprendizagem Personalizada com Machine Learning',
      thumbnail: '/placeholder.svg?height=60&width=100',
      creator: 'Edu Tech',
      watchedAt: 'Ontem, 19:30',
      progress: 45,
      videoId: 'v3',
    },
    {
      id: 'h4',
      title: 'Como Implementar Chatbots Educacionais em Sua Instituição',
      thumbnail: '/placeholder.svg?height=60&width=100',
      creator: 'AI Solutions',
      watchedAt: 'Ontem, 15:20',
      progress: 100,
      videoId: 'v4',
    },
    {
      id: 'h5',
      title: 'Análise de Dados Educacionais: Melhorando Resultados com IA',
      thumbnail: '/placeholder.svg?height=60&width=100',
      creator: 'Data Insights',
      watchedAt: '2 dias atrás',
      progress: 30,
      videoId: 'v5',
    },
  ]);

  // Filtrar histórico com base na pesquisa
  const filteredHistory = historyItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Remover item do histórico
  const removeHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Limpar todo o histórico
  const clearAllHistory = () => {
    setHistoryItems([]);
  };

  // Prevenir scroll do body quando o drawer está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div
        className="absolute right-0 top-0 h-full w-full sm:w-96 bg-[#0F0F13] border-l border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-400" />
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Histórico
            </h2>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Pesquisar no histórico..."
              className="pl-10 bg-white/5 border-white/10 text-gray-200 focus-visible:ring-purple-500 focus-visible:border-purple-500 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* History list */}
        <div className="flex-1 overflow-y-auto">
          {filteredHistory.length > 0 ? (
            <div className="divide-y divide-white/5">
              {filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex space-x-3">
                    {/* Thumbnail */}
                    <Link
                      to={`/watch/${item.videoId}`}
                      className="relative w-24 flex-shrink-0"
                    >
                      <img
                        src={item.thumbnail || '/placeholder.svg'}
                        alt={item.title}
                        className="w-full aspect-video object-cover rounded"
                      />

                      {/* Progress bar */}
                      {item.progress < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/watch/${item.videoId}`} className="block">
                        <h3 className="text-white text-sm font-medium line-clamp-2 hover:text-purple-400 transition-colors">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-gray-400 text-xs mt-1">
                        {item.creator}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {item.watchedAt}
                      </p>
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8 rounded-full flex-shrink-0"
                      onClick={() => removeHistoryItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Clock className="h-12 w-12 text-gray-500 mb-2" />
              {searchQuery ? (
                <>
                  <h3 className="text-white font-medium">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Não encontramos nenhum vídeo correspondente à sua pesquisa
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-white font-medium">Histórico vazio</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Os vídeos que você assistir aparecerão aqui
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {filteredHistory.length > 0 && (
          <div className="p-4 border-t border-white/10">
            <Button
              variant="outline"
              className="w-full border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
              onClick={clearAllHistory}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar histórico
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
