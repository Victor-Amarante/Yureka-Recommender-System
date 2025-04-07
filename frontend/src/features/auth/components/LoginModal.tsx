import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginButton } from './LoginButton';
import SignupFormDemo from '@/components/signup-form-demo';
import { LoginForm } from './LoginForm';

export default function LoginModal() {
  const [open, setOpen] = useState(false);

  const handleLoginWithGoogle = () => {
    window.location.href = '/auth/google';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <LoginButton />
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-2xl border bg-zinc-950 border-zinc-800 ">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-white">
            Bem-vindo ao
            <span className="bg-gradient-to-r text-3xl font-righteous from-[#CCB6FF] to-[#F4E3FB] text-transparent bg-clip-text font-bold ml-1.5">
              YuReka
            </span>
          </DialogTitle>
        </DialogHeader>

        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
