import { Time } from '../types/Routine';

export const getTimeUntil = (targetTime: Time): string => {
  const now = new Date();
  const [hours, minutes, seconds] = targetTime.split(':').map(Number);

  const target = new Date();
  target.setHours(hours, minutes, seconds);

  // If target time is earlier today, assume it's for tomorrow
  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours}h ${diffMinutes}min`;
};
