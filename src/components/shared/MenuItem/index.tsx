import { Link } from 'react-router-dom';
import Icon from 'components/shared/Icon';
import type { Icon as IconType } from 'components/shared/MenuItem/menuItems';
import { type DIALOG_TYPE, openDialog } from 'store/dialog/slice';
import { useAppDispatch } from 'store/index';
import { cn } from 'helpers/ui';
import { replaceString } from 'helpers/common';
import styles from './styles.module.css';

interface IMenuItem {
  icon?: IconType | null;
  label: string;
  count?: number;
  background?: boolean;
  selected: boolean;
  isOpen?: boolean;
  onClick?: (itemId: number | string) => void;
  href?: string;
  id: number | string;
  withBorder?: boolean;
  dialogId?: keyof typeof DIALOG_TYPE;
}

const isIconWithHref = (
  icon: IconType,
): icon is { id: string; href: string } => {
  return 'href' in icon && 'id' in icon;
};

const isIconComponent = (
  icon: IconType,
): icon is { component: (props: any) => JSX.Element } => {
  return 'component' in icon;
};

const MenuItem = ({
  icon,
  label,
  count,
  selected,
  background,
  isOpen,
  onClick,
  href,
  id,
  withBorder,
  dialogId,
}: IMenuItem) => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (onClick) {
      onClick(id);
    }

    if (dialogId) {
      dispatch(openDialog({ id: dialogId }));
    }
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (isIconWithHref(icon)) {
      return (
        <Icon
          id={icon.id}
          href={icon.href}
          className={cn(
            'w-5 h-5 fill-white',
            { 'fill-current text-black': selected && !withBorder },
            { 'fill-green-2': withBorder },
          )}
        />
      );
    }

    if (isIconComponent(icon)) {
      const IconComponent = icon.component;
      return (
        <IconComponent
          className={cn(
            'w-5 h-5 fill-white',
            { 'fill-current text-black': selected && !withBorder },
            { 'fill-green-2': withBorder },
          )}
        />
      );
    }

    return null;
  };

  return (
    <button
      title={label}
      type="button"
      className={cn(
        'flex items-center justify-items-center text-white',
        { 'rounded-xl bg-[#80F31D]': selected },
        { 'rounded-xl bg-gray-750 text-white ': background },
        { 'border border-[#80F31D] text-white': selected && withBorder },
        { [styles.open]: isOpen },
        styles.button,
      )}
    >
      <Link
        to={href || ''}
        className={cn('w-full flex items-center', { '': selected })}
        onClick={() => {
          onClickHandler();
        }}
      >
        <span
          className={cn('w-10 h-10 shrink-0 flex items-center justify-center')}
        >
          {renderIcon()}
        </span>
        <span
          className={cn(
            'text-nowrap text-xs capitalize',
            { 'text-black': selected },
            { 'text-white': selected && withBorder },
            { [styles.labelOpen]: isOpen },
            styles.label,
          )}
        >
          {replaceString(label, /-/g, ' ')}
        </span>
      </Link>

      {!!count && isOpen && (
        <div className="flex items-center justify-center w-[30px] h-5 mr-2.5 bg-gray-700 text-[#71DF2A] rounded-[100px] text-xs font-medium">
          <span className={cn('text-green-2', { [styles.open]: isOpen })}>
            {count}
          </span>
        </div>
      )}
    </button>
  );
};

export default MenuItem;
