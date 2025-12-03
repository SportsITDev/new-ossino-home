import { cn } from 'helpers/ui';

interface IIconBaseProps {
  id: string;
  href: string;
  className?: string;
}

type IIconProps =
  Omit<IIconBaseProps, 'className'>
  & Partial<Pick<IIconBaseProps, 'className'>>;


const Icon = ({ id, href, className }: IIconProps) => {
  return (
    <svg className={cn("w-full h-full", className)}>
      <use className={className} href={`${href}#${id}`} />
    </svg>
  );
};

export default Icon;

