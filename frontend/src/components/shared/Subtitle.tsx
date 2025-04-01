import { cn } from '@/lib/utils';
import React from 'react';

interface SubtitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function Subtitle({
  children,
  className,
  ...props
}: SubtitleProps) {
  return (
    <span className={cn('text-gray-400 text-sm', className)} {...props}>
      {children}
    </span>
  );
}
