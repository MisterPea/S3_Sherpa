import * as React from 'react';
import { ListObjectProps } from 'types';
import CheckCircle from './CheckCircle';
import ContextButton from './ContextButton';

export default function ListObject({
  label,
  isSelected,
  menuDisabled,
  storageClass,
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
    <li className={`list_object_folder object${isFinal ? ' is_final' : ''}`}>
      <button
        tabIndex={0}
        type="button"
        onKeyDown={(e) => handleKeyDown(e, 'mainButton')}
        className="list_object_folder-button"
        onClick={() => handleButtonClick('mainButton')}
      >
        <CheckCircle checked={!!isSelected} />
        <div className="list_object_folder-text_wrap">
          <p className="list_object_folder-label">{label}</p>
          {storageClass && <p className="list_object_folder-storage_class">{storageClass}</p>}
        </div>
      </button>
      <div className="list_object_folder-context_button_wrap">
        <ContextButton disabled={menuDisabled} action={() => handleButtonClick('secondaryButton')} />
      </div>
    </li>
  );
}
