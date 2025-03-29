import { Head } from '@/components/seo';
import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <Head description="YuReka" />
      <AppRouter />
    </AppProvider>
  );
};
