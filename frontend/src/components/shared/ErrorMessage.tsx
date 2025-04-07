import type React from 'react';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  icon?: React.ReactNode;
  className?: string;
  fullPage?: boolean;
}

export default function ErrorMessage({
  title = 'Falha ao carregar conteúdo',
  message = 'Não foi possível carregar o conteúdo solicitado. Por favor, tente novamente mais tarde.',
  onRetry,
  icon,
  className = '',
  fullPage = false,
}: ErrorMessageProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const iconAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, type: 'spring', stiffness: 200 },
    },
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center p-6 ${
        fullPage ? 'min-h-[50vh]' : 'min-h-[200px]'
      } ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-4 text-red-400" {...iconAnimation}>
        {icon || <AlertCircle className="h-12 w-12" />}
      </motion.div>

      <motion.h3
        className="text-xl font-bold text-white mb-2"
        variants={itemVariants}
      >
        {title}
      </motion.h3>

      <motion.p className="text-gray-400 mb-6 max-w-md" variants={itemVariants}>
        {message}
      </motion.p>

      {onRetry && (
        <motion.div variants={itemVariants}>
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <div className="flex flex-row gap-2">
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
              <span>Tentar novamente</span>
            </div>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
