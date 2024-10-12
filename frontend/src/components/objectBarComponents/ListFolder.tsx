import * as React from 'react';
import { ListObjectProps } from 'types';
import Svg from '../../components/Svg';
import UploadButton from './UploadButton';

export default function ListFolder({
  label,
  menuDisabled,
  mainAction,
  secondaryAction,
  isFinal,
}: ListObjectProps) {

  // This handles both buttons
  function handleButtonClick(buttonName: string) {
    if (buttonName === 'mainButton') {
      mainAction();
    } else {
      secondaryAction();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, buttonName: string) {
    e.stopPropagation();
    if (e.key === 'Enter') {
      handleButtonClick(buttonName);
    }
  }

  return (
    <li
      className={`list_object_folder object${isFinal ? ' is_final' : ''}`}
    >
      <button
        tabIndex={0}
        type="button"
        onKeyDown={(e) => handleKeyDown(e, 'mainButton')}
        className="list_object_folder-button folder"
        onClick={() => handleButtonClick('mainButton')}
      >
        <Svg.Folder />
        <div className="list_object_folder-text_wrap">
          <p className="list_object_folder-label">{label}</p>
        </div>
      </button>
      <div className="list_object_folder-upload_button_wrap">
        <UploadButton disabled={menuDisabled} action={() => handleButtonClick('secondaryButton')} />
      </div>
    </li>
  );
}
