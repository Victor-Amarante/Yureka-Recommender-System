import logo from '@/assets/logo.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Heart,
  History,
  ListMusic,
  LogOut,
  Moon,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import HistoryDrawer from './HistoryDrawer';
import { useCurrentRoutine } from '@/features/routine/api/get-current-routine';
import { getTimeUntil } from '@/features/routine/utils/getTimeUntil';
import { cn } from '@/lib/utils';

export default function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  // const { data, isLoading, isError } = useCurrentRoutine();

  // const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  // useEffect(() => {
  //   if (data) {
  //     setTimeRemaining(getTimeUntil(data.end_time));
  //   }
  // }, [data]);

  return (
    <>
      <header className="w-full border-b border-white/5 bg-[#0F0F13]/80 backdrop-blur-md sticky top-0 z-50 text-white">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="h-8 w-32 relative">
                  <img src={logo} alt="logo YuReka" width={200} height={200} />
                </div>
              </Link>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 bg-white/5 border-white/10 text-gray-200 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <div className="flex gap-2 text-sm text-gray-200 font-medium">
                  <span
                    className="text-sm text-gray-200 font-medium"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    Tempo livre: 1h 23m
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-full"
                onClick={() => setIsHistoryOpen(true)}
                disabled
              >
                <History className="h-5 w-5" />
                <span className="sr-only">History</span>
              </Button>

              <Link to="/topics">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-white/5 rounded-full"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-purple-500/30 hover:border-purple-500/80 transition-all cursor-pointer">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" />
                    <AvatarFallback className="text-gray-200 bg-gradient-to-br from-purple-600 to-pink-500">
                      YR
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#1A1A22]/95 backdrop-blur-md text-white border-white/10 rounded-xl p-1"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p
                        className="text-sm font-medium leading-none text-white"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        Eliseu C. de Brito
                      </p>
                      <p className="text-xs leading-none text-gray-400">
                        ecb2@cin.ufpe.br
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    disabled
                    className="rounded-lg focus:bg-white/10 focus:text-white px-3 py-2 cursor-pointer"
                  >
                    <Heart className="mr-2 h-4 w-4 text-white" />
                    <span>Likes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled
                    className="rounded-lg focus:bg-white/10 focus:text-white px-3 py-2 cursor-pointer"
                  >
                    <ListMusic className="mr-2 h-4 w-4 text-white" />
                    <span>Playlists</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled
                    className="rounded-lg focus:bg-white/10 focus:text-white px-3 py-2 cursor-pointer"
                  >
                    <Users className="mr-2 h-4 w-4 text-white" />
                    <span>Following</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled
                    className="rounded-lg focus:bg-white/10 focus:text-white px-3 py-2 cursor-pointer"
                  >
                    <Moon className="mr-2 h-4 w-4 text-white" />
                    <span>Appearance</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400 px-3 py-2 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4 " />
                    <span>Logut</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
}
