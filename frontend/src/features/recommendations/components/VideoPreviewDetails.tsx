import Divider from '@/components/shared/Divider';
import Subtitle from '@/components/shared/Subtitle';
import { EllipsisVertical } from 'lucide-react';

export default function VideoPreviewDetails() {
  return (
    <div className="px-2 py-4 justify-start">
      <div className="flex flex-row items-start">
        <h3
          className="text-white font-medium text-lg line-clamp-2 mb-2"
          style={{ fontFamily: 'var(--font-outfit)' }}
        >
          {'Um dia como um coreano asd asdas pedreiro dasds dasdasads'}
        </h3>

        <button className="text-gray-400 cursor-pointer hover:text-white transition-colors pt-1">
          <EllipsisVertical className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center">
        <Subtitle>Art Guy</Subtitle>
        <Divider />
        <Subtitle>5 horas atrás</Subtitle>
        <Divider />
        <Subtitle>21K visualizações</Subtitle>
      </div>
    </div>
  );
}
