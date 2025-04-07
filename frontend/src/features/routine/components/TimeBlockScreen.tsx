import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, AlarmClock, Timer, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Routine, WEEK_DAYS } from '../types/Routine';

interface TimeBlockScreenProps {
  isActive: boolean;
  currentRoutine?: Routine | null;
  nextRoutine?: Routine | null;
  onClose?: () => void;
}

export default function TimeBlockScreen({
  isActive,
  currentRoutine,
  nextRoutine,
  onClose,
}: TimeBlockScreenProps) {
  const formatWeekDay = (day: WEEK_DAYS) => {
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
  };

  return (
    <AnimatePresence>
      {!isActive && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-br from-zinc-900/90 to-black/90 p-8 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close button (only for development) */}
            {onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}

            {/* Emoji and title */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-2xl font-bold text-white mb-2">Time's Up!</h2>
              <p className="text-gray-300">
                Your free time has ended. Time to focus on your scheduled
                activities.
              </p>
            </div>

            {/* Current routine info */}
            {currentRoutine && (
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 flex items-center mb-2">
                  <Clock size={16} className="mr-2 text-purple-400" />
                  Current Schedule
                </h3>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/20 rounded-lg p-2">
                    <AlarmClock size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {currentRoutine.topic?.name}
                    </p>
                    <div className="text-sm text-gray-400 mt-1">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        <span>{formatWeekDay(currentRoutine.week_day)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock size={14} className="mr-1.5" />
                        <span>{currentRoutine.start_time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next free time info */}
            {nextRoutine && (
              <div className="bg-white/5 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-400 flex items-center mb-2">
                  <Timer size={16} className="mr-2 text-emerald-400" />
                  Next Free Time
                </h3>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500/20 rounded-lg p-2">
                    <Timer size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {nextRoutine.topic?.name}
                    </p>
                    <div className="text-sm text-gray-400 mt-1">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        <span>{formatWeekDay(nextRoutine.week_day)}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock size={14} className="mr-1.5" />
                        <span>{nextRoutine.end_time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700">
                View My Schedule
              </Button>
              <Button
                variant="ghost"
                className="w-full text-gray-300 hover:bg-transparent hover:text-white transition-colors duration-200"
              >
                Adjust Preferences
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
