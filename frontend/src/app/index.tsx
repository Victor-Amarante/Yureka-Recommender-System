import DottedBackground from '@/components/layouts/DottedBackground';
import { Head } from '@/components/seo';
import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <Head description="YuReka" />

      <div className="w-screen h-screen bg-[#0F0F13] relative">
        <DottedBackground />
        <div className="w-full h-full max-w-[1440px] mx-auto">
          <AppRouter />
        </div>
      </div>
    </AppProvider>
  );
};
