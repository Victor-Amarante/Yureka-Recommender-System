import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerContainerProps {
  isExpanded: boolean;
  children: ReactNode;
}

export function VideoPlayerContainer({
  isExpanded,
  children,
}: VideoPlayerContainerProps) {
  return (
    <>
      {/* placeholder div to mantain layout when expanded */}
      {isExpanded && <div className="w-full aspect-video" />}

      <motion.div
        className={cn(
          'rounded-2xl aspect-video bg-black/80 z-30',
          isExpanded ? 'fixed inset-0 top-20 m-auto' : 'relative w-full',
        )}
        style={{
          height: isExpanded ? '85vh' : '100%',
          maxWidth: isExpanded ? '90vw' : '100%',
        }}
        layout
        transition={{
          duration: 0.2,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
