import * as React from 'react';
import Svg from '../Svg';

interface UploadButtonProps {
  disabled: boolean;
  action: () => void;
}

export default function UploadButton({ action, disabled = false }: UploadButtonProps) {
  function handleAction(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (action && disabled === false) {
      action();
    }
  }

  return (
    <button
      className="upload_button"
      data-testid="upload-button"
      type="button"
      tabIndex={0}
      onClick={handleAction}
      aria-label="upload-button"
      aria-disabled={disabled}
      disabled={disabled}
    >
      <Svg.UploadCloudOutline />
    </button>
  );
}
