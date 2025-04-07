import notFound from '@/assets/not-found.svg';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

const NotFoundRoute = () => {
  const user = useUser();

  const redirectLink = user.data
    ? paths.app.home.getHref()
    : paths.landing.getHref();

  return (
    <div className="w-screen h-screen text-white flex flex-col items-center pt-[15%] font-semibold">
      <img src={notFound} width={'30%'} alt="Página não encontrada" />
      <Link to={redirectLink} replace>
        <Button className="text-white bg-purple-800 hover:text-gray-400 transition-colors">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundRoute;
