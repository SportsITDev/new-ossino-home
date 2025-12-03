import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from 'helpers/ui';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg bg-gray-700 p-3 text-sm placeholder:text-gray-500 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neon-1',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
