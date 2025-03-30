import { ReactNode } from 'react';
import AppNavbar from './AppNavbar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="w-screen min-h-screen">
      <AppNavbar />
      <main className="flex-1 w-full py-20 max-w-relative">{children}</main>
    </div>
  );
}
