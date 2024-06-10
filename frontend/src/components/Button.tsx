import * as React from 'react';
import { ButtonProps } from 'types';
import Svg from './Svg';

export default function Button({
  label,
  width = 'content',
  type = 'primary',
  plusIcon = false,
  uploadCloud = false,
  disabled = false,
  action,
}: ButtonProps) {
  const classes = [
    'main-button',
    width === 'full' ? 'full-width' : 'content-width',
    type,
    disabled ? 'btn-disabled' : 'btn-active',
  ].join(' ');

  function handleClickAction() {
    if (action && disabled === false) action();
  }

  return (
    <button className={classes} type="button" title={label} onClick={handleClickAction}>
      <span>
        {uploadCloud && (
          <span className="upload_icon-wrapper">
            <Svg.UploadCloud />
          </span>
        )}
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
