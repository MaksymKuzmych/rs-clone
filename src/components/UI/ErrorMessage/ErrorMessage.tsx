import { memo } from 'react';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = memo(({ error }: ErrorMessageProps) => {
  return <p>{error}</p>;
});
