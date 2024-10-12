import * as React from 'react';
import Svg from './Svg';

export default function MainTitle() {
  return (
    <div className="main_title">
      <div className="main_title-svg">
        <Svg.SherpaCat />
      </div>
      <h1 className="main_title-text">
        S3
        <span>Sherpa</span>
      </h1>
    </div>
  );
}
