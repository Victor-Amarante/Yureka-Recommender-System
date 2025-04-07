import { ReactNode, useEffect, useState } from 'react';
import AppNavbar from './AppNavbar';
import TimeBlockScreen from '@/features/routine/components/TimeBlockScreen';
import {
  mockRoutine,
  Routine,
  WEEK_DAYS,
} from '@/features/routine/types/Routine';
import { isRoutineActiveNow } from '@/features/routine/utils/routineIsActive';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const currentRoutine: Routine = {
    ...mockRoutine(),
    end_time: '14:44:40',
    start_time: '14:40:00',
    week_day: WEEK_DAYS.MONDAY,
  };

  const [isActive, setIsActive] = useState<boolean>(
    isRoutineActiveNow(currentRoutine),
  );

  useEffect(() => {
    setIsActive(isRoutineActiveNow(currentRoutine));

    const intervalId = setInterval(() => {
      setIsActive(isRoutineActiveNow(currentRoutine));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [currentRoutine]);

  return (
    <div className="w-screen h-full min-h-screen flex flex-col">
      <TimeBlockScreen
        isActive={true}
        currentRoutine={currentRoutine}
        nextRoutine={mockRoutine()}
      />
      <AppNavbar />
      <main className="flex-1 w-full max-w-relative">{children}</main>
    </div>
  );
}
