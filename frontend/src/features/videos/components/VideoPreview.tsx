import { Clock } from 'lucide-react';
import AuthorImage from './AuthorImage';
import VideoPreviewDetails from './VideoPreviewDetails';

export function VideoPreview() {
  return (
    <div className="group">
      <div className="relative aspect-video rounded-t-lg mb-4">
        <img
          src={
            'https://images.unsplash.com/photo-1742268350489-e5d1c0616c54?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={'title'}
          className="w-full h-full rounded-2xl object-cover transition-transform duration-700"
        />

        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {'12:54'}
        </div>

        <AuthorImage
          className="bg-do absolute bottom-[-0.5rem] left-[-0.25rem] border-8 border-black"
          size={40}
          channel="ecb2"
          src={'https://github.com/eliseucbrito.png'}
        />
      </div>

      <VideoPreviewDetails />
    </div>
  );
}
