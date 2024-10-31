import React from 'react';
import classNames from 'classnames';
import style from './Text.module.css';

interface TextProps {
  As?: keyof JSX.IntrinsicElements;
  color?: string;
  size?: number;
  tsize?: number;
  dsize?: number;
  className?: string;
  children: React.ReactNode;
  href?: string;
  center?: boolean;
  weight?: string;
  onClick?: () => void;
  bold?: boolean;
}

export const Text: React.FC<TextProps> = ({
  As = 'span',
  color = 'black',
  size,
  tsize,
  dsize,
  className,
  children,
  href,
  center,
  weight,
  onClick,
  bold,
}) => {
  const classes = classNames(
    className,
    style[color],
    { [style.center]: center },
    { [style[`fs${size}`]]: size },
    { [style[`fst${tsize}`]]: tsize },
    { [style[`fsd${dsize}`]]: dsize },
    { [style[`${weight}`]]: weight },
    { [style.bold]: bold } // Добавляем класс для bold, если он установлен
  );

  if (onClick) {
    return (
      <As className={classes} href={href} onClick={onClick}>
        {children}
      </As>
    );
  } else {
    return (
      <As className={classes} href={href}>
        {children}
      </As>
    );
  }
};