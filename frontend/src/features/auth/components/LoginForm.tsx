import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconBrandGoogle } from '@tabler/icons-react';
import { Link } from 'react-router';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6 dark', className)} {...props}>
      <Card className="bg-zinc-950 border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Login</CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-zinc-400"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
              >
                Login
              </Button>
              <Link to={'/app/home'}>
                <button
                  className="group/btn shadow-input relative flex justify-center h-10 w-full items-center space-x-2 rounded-md px-4 font-medium bg-zinc-800 shadow-[0px_0px_1px_1px_#333333]"
                  type="submit"
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
                  <span className="text-sm text-center text-neutral-300">
                    Google
                  </span>
                </button>
              </Link>
            </div>
            <div className="mt-4 text-center text-sm text-zinc-400">
              Don&apos;t have an account?{' '}
              <a
                href="#"
                className="underline underline-offset-4 text-zinc-300"
              >
                Registar-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
