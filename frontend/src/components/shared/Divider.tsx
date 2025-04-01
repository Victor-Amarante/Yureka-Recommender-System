import { cn } from '@/lib/utils';

export default function Divider({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex-1 max-w-6 mx-2 border-t border-[1.5px] border-white/20',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
