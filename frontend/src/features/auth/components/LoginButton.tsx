import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export function LoginButton() {
  return (
    // <Link to="/app/home">
    <Button
      variant="ghost"
      className="text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
    >
      Entrar
    </Button>
    // </Link>
  );
}
