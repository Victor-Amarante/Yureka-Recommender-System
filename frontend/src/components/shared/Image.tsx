import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ src, alt, className }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative size-full">
      {!loaded && (
        <div className="absolute size-full bg-gray-700 animate-pulse rounded-lg" />
      )}

      <img
        src={src}
        alt={alt}
        className={cn(
          'size-full opacity-0 rounded-2xl object-cover transition-transform duration-700 z-10',
          { 'opacity-100': loaded },
          className,
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
