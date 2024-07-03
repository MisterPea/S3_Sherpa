import * as React from 'react';
import { CheckCircleProps } from 'types';
import Svg from '../Svg';

export default function CheckCircle({ checked = false }: CheckCircleProps) {
  return (
    <div
      className={`checked_circle${checked ? ' is-checked' : ''}`}
      aria-label={`check-circle-is-${checked ? 'checked' : 'not-checked'}`}
    >
      <div className="checked_circle-svg_wrap">
        <Svg.CircleCheck />
      </div>
      <div className="checked_circle-circle" />
    </div>
  );
}
