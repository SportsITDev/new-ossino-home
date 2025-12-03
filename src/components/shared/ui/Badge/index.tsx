import type { HTMLAttributes } from 'react';

import { cn } from 'helpers/ui';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {}

const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'rounded-full py-1 px-3 font-bold text-sm bg-neon-1 text-black',
        className,
      )}
      {...props}
    />
  );
};

export default Badge;
