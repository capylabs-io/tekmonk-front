import classNames from 'classnames';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

const styles = {
  'b-wide': 'min-w-[200px]',
  'b-small': 'text-sm font-medium px-4 !py-1',
  'b-medium': 'text-base font-medium px-10 !py-3',
  'b-large': 'text-lg font-medium px-14 !py-3',
};

const BASE_CLASS =
  'flex items-center justify-center rounded-xl px-4 py-3 text-center font-semibold';

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  outlined?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  urlIcon?: string;
  onClick?: () => void;
  wide?: boolean;
  highlight?: boolean;
  id?: string;
}>;

export const Button: React.FC<Props> = ({
  disabled,
  size,
  className,
  outlined,
  highlight,
  urlIcon,
  loading,
  wide,
  children,
  onClick,
  id,
}) => {
  const sizes = ['small', 'medium', 'large'];
  const classes = classNames([
    BASE_CLASS,
    size && sizes.includes(size) ? styles[`b-${size}`] : styles['b-medium'],
    loading || disabled ? 'cursor-default opacity-10' : '',
    outlined
      ? 'bg-white text-black border border-gray-200'
      : 'bg-black text-white',
    highlight && 'bg-white text-black border !border-black',
    wide && 'w-full',
    className,
  ]);

  const handleOnClick = () => {
    onClick && onClick();
  };
  return (
    <button
      id={id}
      onClick={handleOnClick}
      type="button"
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <span
          className={classNames(
            'inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent',
            outlined ? 'text-black/60' : 'text-white/60'
          )}
          role="status"
          aria-label="loading"
        />
      ) : (
        <div className="flex items-center">
          {urlIcon && (
            <Image
              className="mr-2"
              src={urlIcon}
              width={16}
              height={16}
              alt="button icon"
            />
          )}
          {children}
        </div>
      )}
    </button>
  );
};
