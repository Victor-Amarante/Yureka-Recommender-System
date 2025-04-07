import { ReactNode } from 'react';
import ErrorMessage from './ErrorMessage';
import { AnimatePresence, motion } from 'framer-motion';

interface AsyncStateHandlerProps<T> {
  isLoading: boolean;
  isError?: boolean;
  data: T | undefined | null;
  skeleton?: ReactNode;
  errorMessage?: string;
  render: (data: T) => ReactNode;
  handleRetry?: () => void;
  fullPage?: boolean;
}

export function AsyncStateHandler<T>({
  isLoading,
  isError,
  data,
  skeleton,
  errorMessage = 'Algo deu errado.',
  render,
  fullPage = false,
  handleRetry,
}: AsyncStateHandlerProps<T>) {
  const variants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const shouldShowError = isError || (!data && !isLoading);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {skeleton}
        </motion.div>
      )}

      {shouldShowError && (
        <motion.div
          key="error"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="flex flex-1 mx-auto"
        >
          <ErrorMessage
            title="Opa! Deu ruim aqui..."
            message={errorMessage}
            onRetry={handleRetry}
            fullPage={fullPage}
          />
        </motion.div>
      )}

      {!isLoading && data && !isError && (
        <motion.div
          key="content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {render(data)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
