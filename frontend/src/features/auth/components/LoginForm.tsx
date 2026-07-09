import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { useLogin, useUser } from '@/lib/auth';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (element: HTMLElement, config: object) => void;
        };
      };
    };
  }
}

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();
  const user = useUser();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user.data) {
      navigate(paths.app.home.getHref());
      return;
    }

    const initGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: env.GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try {
            await login(response.credential);
            navigate(paths.onboarding.topics.getHref());
          } catch {
            // erro já capturado pelo interceptor do axios
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        shape: 'rectangular',
      });
    };

    if (window.google) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          initGoogle();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [login, navigate, user.data]);

  return (
    <div className={cn('flex flex-col gap-6 dark', className)} {...props}>
      <Card className="bg-zinc-950 border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Entrar no Yureka</CardTitle>
          <CardDescription className="text-zinc-400">
            Faça login com sua conta Google para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div ref={googleButtonRef} className="flex justify-center" />
            <p className="text-center text-xs text-zinc-500">
              Ao entrar, você concorda com os termos de uso do Yureka.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
