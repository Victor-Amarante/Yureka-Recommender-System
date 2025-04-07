import watching from '@/assets/watching.json';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router';

import Typewriter from '@/components/fancy/components/text/typewriter';
import LandingHeader from '@/components/shared/LandingHeader';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const LandingRoute = () => {
  // const navigate = useNavigate();
  // const user = useUser();

  // const handleStart = () => {
  //   if (user.data) {
  //     navigate(paths.app.home.getHref());
  //   } else {
  //     navigate(paths.auth.login.getHref());
  //   }
  // };

  return (
    <div className="w-screen h-screen">
      <LandingHeader />

      <div className="flex flex-row max-w-relative justify-between items-center p-16 pt-36">
        <div className="w-min md:text-4xl lg:text-5xl sm:text-3xl text-2xl text-white dark:text-muted font-normal overflow-hidden font-righteous tracking-widest">
          <span className="text-6xl block whitespace-nowrap">
            {'TENHA CONTROLE'}
          </span>
          <span className="text-6xl w-full text-end">{'DO SEU'}</span>

          <Typewriter
            speed={40}
            className="text-6xl text-purple-400 px-4 rounded-lg"
            waitTime={2000}
            deleteSpeed={40}
            cursorChar={'_'}
            text={['TEMPO', 'FOCO', 'DIA']}
          />

          <p className="text-gray-300 mx-auto mt-4 text-start break-words text-lg md:text-xl font-outfit tracking-normal">
            <strong>YuReka</strong> é a plataforma que adapta{' '}
            <strong>conteúdo de qualidade</strong> ao seu{' '}
            <strong>tempo disponível</strong>. Aproveite cada momento com{' '}
            <strong>vídeos personalizados</strong> para sua{' '}
            <strong>rotina</strong>.
          </p>
        </div>

        <div>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: watching,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingRoute;
