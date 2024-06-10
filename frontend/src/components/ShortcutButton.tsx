/* eslint-disable max-len */
import * as React from 'react';
import { ButtonTypes, ShortcutButtonProps } from 'types';
import Svg from './Svg';

function SvgImage({ buttonType }: { buttonType: ButtonTypes; }): { Component: JSX.Element, label: string; } {
  if (buttonType === 'delete') {
    return {
      Component: <Svg.Delete />,
      label: 'DELETE',
    };
  }
  if (buttonType === 'newFolder') {
    return {
      Component: <Svg.NewFolder />,
      label: 'NEW FOLDER',
    };
  }
  if (buttonType === 'intoFolder') {
    return {
      Component: <Svg.IntoFolder />,
      label: 'INTO FOLDER',
    };
  }
  if (buttonType === 'storageClass') {
    return {
      Component: <Svg.StorageClass />,
      label: 'STORAGE CLASS',
    };
  }
  return {
    Component: <Svg.Download />,
    label: 'DOWNLOAD',
  };
}

export default function ShortcutButton({ buttonType, action }: ShortcutButtonProps) {
  const { Component, label } = SvgImage({ buttonType });

  function handleClickAction() {
    if (action) action();
  }

  return (
    <button onClick={handleClickAction} type="button" className="shortcut_btn">
      <div className={`shortcut_btn-component--${buttonType === 'delete' ? 'dark' : 'light'}`}>
        {Component}
      </div>
      <p className="shortcut_button-label">{label}</p>
    </button>
  );
}
