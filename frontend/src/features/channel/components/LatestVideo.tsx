import Image from '@/components/shared/Image';
import Subtitle from '@/components/shared/Subtitle';
import { formatRelativeDate } from '@/utils/formats';
import { fakerPT_BR } from '@faker-js/faker';
import { Clock } from 'lucide-react';
import { NavLink } from 'react-router';

interface LatestVideoProps {
  id: string;
  thumbnail_url: string;
  title: string;
}

export function LatestVideo({ id, thumbnail_url, title }: LatestVideoProps) {
  return (
    <NavLink key={id} to={'adsdas'}>
      <div className="group/video flex items-start rounded-md gap-2">
        <div className="w-1/3 aspect-video">
          <Image src={thumbnail_url} className="rounded-md" alt={title} />
        </div>

        <div className="group-hover/video:translate-x-2 transition-transform duration-200">
          <p className="text-md text-gray-200 line-clamp-1">{title}</p>
          <div className="flex items-center min-w-0">
            <Clock className="w-3 h-3 text-gray-400" />
            <Subtitle className="ml-1 truncate">
              {formatRelativeDate(fakerPT_BR.date.past())}
            </Subtitle>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
