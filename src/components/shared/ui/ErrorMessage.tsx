import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-red-400 text-center">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};