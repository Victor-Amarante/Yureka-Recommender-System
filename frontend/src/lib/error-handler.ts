import { AxiosError } from 'axios';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';

export function handleApiError(
  error: AxiosError<{ message?: string; code?: string }>,
) {
  const message = error.response?.data?.message || error.message;

  useNotifications.getState().addNotification({
    type: 'error',
    title: 'Error',
    message,
  });

  if (error.response?.status === 401) {
    const searchParams = new URLSearchParams();
    const redirectTo =
      searchParams.get('redirectTo') || window.location.pathname;
    window.location.href = paths.auth.login.getHref(redirectTo);
  }

  return Promise.reject(error);
}
