import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@radix-ui/react-avatar';
import { Link } from 'react-router';

interface AuthorImageProps extends AvatarProps {
  src: string;
  channel_name: string;
  channel_id: string;
  size?: number;
}

export default function AuthorImage({
  channel_name,
  channel_id,
  size,
  src,
  className,
  ...props
}: AuthorImageProps) {
  return (
    <Link to={`/channel/${channel_id}`}>
      <Avatar
        className={cn('w-16 h-16', { size: `w-${size} h-${size}` }, className)}
        {...props}
      >
        <AvatarImage src={src} alt={`@${channel_name}`} />
        <AvatarFallback>
          {channel_name
            .split(' ')
            .map((v) => v[0].toUpperCase())
            .join('')}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
