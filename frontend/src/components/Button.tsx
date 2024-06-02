import * as React from 'react';
import { ButtonProps } from 'types';
import Svg from './Svg';

export default function Button({
  label, width = 'content', type = 'primary', plusIcon = false,
}: ButtonProps) {
  const classes = [
    'main-button',
    width === 'full' ? 'full-width' : 'content-width',
    type,
  ].join(' ');

  return (
    <button className={classes} type="button" title={label}>
      <span>
        {label}
        {plusIcon && (
          <span className="plus_icon-wrapper">
            <Svg.Plus />
          </span>
        )}
      </span>
    </button>
  );
}
