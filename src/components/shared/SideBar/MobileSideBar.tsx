import { type ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from 'components/shared/ui/Sheet';
import { Button } from 'components/shared/ui/Button';
import Icon from 'components/shared/Icon';
import ActionsBlock from 'components/shared/Actions/ActionsBlock';
import arrowRight from '/icons/arrowRight.svg?url';
import { cn } from 'helpers/ui';

interface MobileSideBarProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  showActions?: boolean;
  children: ReactNode;
  className?: string;
}

const MobileSideBar = ({
  isOpen,
  onOpenChange,
  showActions,
  children,
  className,
}: MobileSideBarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={() => onOpenChange(false)}>
      <SheetContent
        side="right"
        className={cn(
          'w-[250px] p-0 bg-gray-800 flex flex-col gap-8 z-[120]',
          className,
        )}
        overlayClassName="z-[110]"
      >
        <SheetTitle className="flex justify-between pt-5 px-5">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            className="border-gray-700 rounded-lg border text-white bg-transparent w-8 h-8 p-0 flex items-center justify-center"
          >
            <Icon id="arrowRightIcon" href={arrowRight} className="w-4 h-4" />
          </Button>
          {showActions && (
            <ActionsBlock toggleSideBar={() => onOpenChange(false)} />
          )}
        </SheetTitle>
        <SheetDescription hidden />
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
