import * as React from 'react';
import { CheckCircleProps } from 'types';
import Svg from '../Svg';

export default function CheckCircle({ checked = false, action }: CheckCircleProps) {
  function handleAction() {
    if (action) action();
  }

  function handleKeyDow() {

  }

  return (
    <div
      onClick={handleAction}
      className={`checked_circle${checked ? ' is-checked' : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDow}
      role="button"
      aria-label={`check-circle-is-${checked ? 'checked' : 'not-checked'}`}
    >
      <div className="checked_circle-svg_wrap">
        <Svg.CircleCheck />
      </div>
      <div className="checked_circle-circle" />
    </div>
  );
}
