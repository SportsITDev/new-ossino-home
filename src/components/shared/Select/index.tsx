import Icon from 'components/shared/Icon';
import { useOutsideClick } from 'helpers/hooks';
import { cn } from 'helpers/ui';
import { type ReactNode, useRef, useState } from 'react';
import arrowDown from '/icons/arrowDown.svg?url';
import arrowUp from '/icons/arrowUp.svg?url';

const chevronMainStyle = 'w-[24px] h-[24px] flex justify-center items-center';
const chevronAdditionStyle =
  'xl:rounded-[6px] xl:w-[30px] xl:h-[30px] xl:bg-[#212121]';

interface DropDownSelectProps {
  children: ReactNode;
  additionalChild?: ReactNode;
  className?: string;
  dropDownClassName?: string;
  childrenClassName?: string;
  chevronClassName?: string;
  list?: ReactNode;
  withChevron?: boolean;
  closeOnClick?: boolean;
}

const Select = ({ children,
  className,
  dropDownClassName,
  additionalChild,
  childrenClassName,
  chevronClassName,
  list,
  withChevron,
  closeOnClick, }: DropDownSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const closeHandler = () => {
    setIsOpen(false);
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (closeOnClick) setIsOpen(false);
  }

  useOutsideClick(selectRef, closeHandler);

  return (
    <div
      ref={selectRef}
      className="relative h-full cursor-pointer"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div
        className={cn(
          'flex h-full w-full py-3 px-1.5 items-center justify-between rounded-lg bg-gray-700 text-white xl:max-w-[21 zrepoiu325px]',
          className,
        )}
      >
        <div
          className={cn(
            'relative flex w-full items-center justify-center',
            childrenClassName,
            { 'justify-between': withChevron },
          )}
        >
          {children}
          {withChevron && (
            <>
              {isOpen ? (
                <span
                  className={
                    !additionalChild
                      ? cn(
                        chevronMainStyle,
                        chevronAdditionStyle,
                        chevronClassName,
                      )
                      : chevronMainStyle
                  }
                >
                  <Icon id="arrowUpIcon" href={arrowUp} className="w-4 h-4" />
                </span>
              ) : (
                <span
                  className={
                    !additionalChild
                      ? cn(
                        chevronMainStyle,
                        chevronAdditionStyle,
                        chevronClassName,
                      )
                      : chevronMainStyle
                  }
                >
                  <Icon
                    id="arrowDownIcon"
                    href={arrowDown}
                    className="w-4 h-4"
                  />
                </span>
              )}
            </>
          )}
        </div>
        <span className="hidden xl:block">{additionalChild}</span>
      </div>

      {isOpen && (
        <div
          onClick={handleSelectClick}
          className={cn(
            'absolute right-0 z-[300] mt-2 rounded-lg bg-gray-700 shadow-lg min-w-28 max-w-[calc(100vw-16px)]',
            dropDownClassName,
          )}
        >
          {list}
        </div>
      )}
    </div>
  );
};

export default Select;
