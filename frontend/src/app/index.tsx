import { DottedBackground } from '@/components/layouts';
import { Head } from '@/components/seo';
import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <Head description="YuReka" />

      <div className="w-full h-full bg-[#0F0F13] relative overflow-hidden overscroll-behavior: none;">
        <DottedBackground />
        <AppRouter />
      </div>
    </AppProvider>
  );
};
