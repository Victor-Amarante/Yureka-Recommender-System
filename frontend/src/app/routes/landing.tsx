import { useNavigate } from 'react-router';

import LandingHeader from '@/components/shared/LandingHeader';
import { paths } from '@/config/paths';
import Typewriter from '@/fancy/components/text/typewriter';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleStart = () => {
    if (user.data) {
      navigate(paths.app.dashboard.getHref());
    } else {
      navigate(paths.auth.login.getHref());
    }
  };

  return (
    <>
      <div
        className='w-full min-h-screen bg-[#0F0F13] relative">
      {/* Animated gradient background */}'
      >
        <LandingHeader />
        <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>

        <div
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="flex flex-col w-full justify-center md:text-4xl lg:text-5xl sm:text-3xl text-2xl text-white dark:text-muted font-normal overflow-hidden p-16 pt-48 mx-auto font-righteous tracking-widest">
          <span className="text-6xl w-full text-center mx-auto">
            {'TENHA CONTROLE DO'}
          </span>
          <div className="flex w-full">
            <span className="text-6xl w-full text-end">{'SEU'}</span>

            <Typewriter
              speed={40}
              className="text-6xl w-full text-purple-400 px-4 rounded-lg"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={'_'}
              text={['TEMPO', 'FOCO', 'DIA']}
            />
          </div>
          <p className="text-gray-300 mx-auto mt-4 w-3/5 text-center break-words text-lg md:text-xl font-outfit tracking-normal">
            <strong>YuReka</strong> é a plataforma que adapta{' '}
            <strong>conteúdo de qualidade</strong> ao seu{' '}
            <strong>tempo disponível</strong>. Aproveite cada momento com{' '}
            <strong>vídeos personalizados</strong> para sua{' '}
            <strong>rotina</strong>.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
