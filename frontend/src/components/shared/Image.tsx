import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ src, alt }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-2xl" />
      )}

      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full rounded-2xl object-cover transition-transform duration-700',
        )}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
