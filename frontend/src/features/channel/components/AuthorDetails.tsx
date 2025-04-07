import { formatCount } from '@/utils/formats';
import { UserPlus, Youtube } from 'lucide-react';

interface AuthorDetailsProps {
  channel_name?: string;
  subscribers?: number;
  followers?: number;
}

export function AuthorDetails({
  channel_name,
  followers,
  subscribers,
}: AuthorDetailsProps) {
  return (
    <div className="flex flex-col min-w-0 text-white items-start gap-1">
      <h3 className="font-outfit text-lg truncate w-full">{channel_name}</h3>
      <div className="flex gap-3">
        <div className="flex gap-2 items-center">
          <Youtube className="text-red-600 shrink-0" size={18} />
          <span className="font-bold text-sm">
            {subscribers && formatCount(subscribers)}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <UserPlus className="text-purple-500 shrink-0" size={18} />
          <span className="font-bold text-sm">
            {followers && formatCount(followers)}
          </span>
        </div>
      </div>
    </div>
  );
}
