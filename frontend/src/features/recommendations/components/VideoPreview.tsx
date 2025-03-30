import { Clock, Share2, Star } from 'lucide-react';

export function VideoPreview() {
  return (
    <div className="group">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img
          src={
            'https://images.unsplash.com/photo-1742268350489-e5d1c0616c54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={'title'}
          className="w-full h-full object-cover transition-transform duration-700"
        />

        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {'12:54'}
        </div>

        <div className="absolute top-2 left-2 bg-purple-600/80 text-white text-xs px-2 py-1 rounded-md">
          {'Viagem e cultura'}
        </div>
      </div>

      <div className="p-4">
        <h3
          className="text-white font-medium text-lg line-clamp-2 mb-2"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {'Título do vídeo'}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">
            {'42.324'} visualizações
          </span>

          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Star className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
