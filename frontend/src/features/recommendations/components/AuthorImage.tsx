import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@radix-ui/react-avatar';

interface AuthorImageProps extends AvatarProps {
  src: string;
  channel: string;
  size?: number;
}

export default function AuthorImage({
  channel,
  size,
  src,
  className,
  ...props
}: AuthorImageProps) {
  return (
    <Avatar
      className={cn('w-16 h-16', { size: `w-${size} h-${size}` }, className)}
      {...props}
    >
      <AvatarImage src={src} alt={`@${channel}`} />
      <AvatarFallback></AvatarFallback>
    </Avatar>
  );
}
