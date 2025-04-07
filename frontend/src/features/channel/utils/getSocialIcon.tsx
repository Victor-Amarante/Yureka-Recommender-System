import { Check, Users, Eye, Calendar, Link, Clock } from 'lucide-react';
import { Youtube, Twitter, Instagram, Twitch } from 'lucide-react';

export function getSocialIcon(type: string) {
  const iconProps = {
    size: 20,
    className: 'transition-colors',
  };

  switch (type) {
    case 'youtube':
      return (
        <Youtube
          {...iconProps}
          className={`${iconProps.className} hover:text-red-600`}
        />
      );
    case 'twitter':
      return (
        <Twitter
          {...iconProps}
          className={`${iconProps.className} hover:text-blue-400`}
        />
      );
    case 'instagram':
      return (
        <Instagram
          {...iconProps}
          className={`${iconProps.className} hover:text-pink-500`}
        />
      );
    case 'twitch':
      return (
        <Twitch
          {...iconProps}
          className={`${iconProps.className} hover:text-purple-500`}
        />
      );
    default:
      return null;
  }
}
