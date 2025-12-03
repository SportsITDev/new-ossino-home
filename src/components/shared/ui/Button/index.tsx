import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'helpers/ui';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'text-gray-900 bg-button-gradient disabled:bg-none disabled:bg-gray-500 disabled:text-white',
        outline: 'border border-neon-1 bg-none rounded-lg text-neon-1',
        social: 'border border-white bg-none rounded-xl text-white',
        filled:
          'bg-neon-1 text-black disabled:text-gray-500 disabled:bg-gray-500',
        destructive: 'border border-status-error-100 text-status-error-100',
        filledWhite: "bg-white text-gray-900",
        outlineWhite: "border border-white bg-none rounded-lg text-white"
      },
      size: {
        sm: 'h-8 text-xs px-2',
        default: 'h-10 px-[23px] py-2',
        lg: 'h-12 px-8',
        xl: 'h-14 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

// eslint-disable-next-line object-curly-newline
export { Button, buttonVariants };
