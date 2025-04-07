import { UserPlus, Youtube } from 'lucide-react';

export function AuthorDetails() {
  return (
    <div className="flex flex-col min-w-0 text-white items-start gap-1">
      <h3 className="font-righteous text-lg truncate w-full">Art Guy</h3>
      <div className="flex gap-3">
        <div className="flex gap-2 items-center">
          <Youtube className="text-red-600 shrink-0" size={18} />
          <span className="font-bold text-sm">128k</span>
        </div>

        <div className="flex gap-2 items-center">
          <UserPlus className="text-purple-500 shrink-0" size={18} />
          <span className="font-bold text-sm">128k</span>
        </div>
      </div>
    </div>
  );
}
