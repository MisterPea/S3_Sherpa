import * as React from 'react';
import Svg from './Svg';

interface ContextButtonProps {
  disabled: boolean;
  action: () => void;
}

export default function ContextButton({ action, disabled = false }: ContextButtonProps) {
  function handleAction() {
    if (action && disabled === false) {
      action();
    };
  }

  return (
    <button
      className="context_button_ellipsis"
      data-testid="context-button-ellipsis"
      type="button"
      tabIndex={0}
      onClick={handleAction}
      aria-label="context-ellipsis-button"
      aria-disabled={disabled}
      disabled={disabled}
    >
      <Svg.Ellipsis />
    </button>
  );
}
