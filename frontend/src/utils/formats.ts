import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { default as dayjs } from 'dayjs';

export function formatDate(date: number) {
  dayjs(date).format('MMMM D, YYYY h:mm A');
}

export function formatRelativeDate(date: number | Date) {
  return formatDistanceToNow(new Date(date), {
    includeSeconds: false,
    addSuffix: false,
    locale: ptBR,
  })
    .replace('cerca de ', '')
    .replace('aproximadamente ', '');
}

export function formatDateString(date: string | Date) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
}

export function formatCount(count: number) {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}
