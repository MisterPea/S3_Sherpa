export interface ButtonProps {
  label: string;
  icon?: any;
  // default: 'content'
  width?: 'content' | 'full';
  // default: 'primary'
  type?: 'primary' | 'secondary' | 'destructive';
  // button has plus icon applied to it - default: false
  plusIcon?: boolean;
  // button has upload cloud applied to it - default: false
  uploadCloud?: boolean;
  // button is disabled - default: false
  disabled?: boolean;
  action: () => void;
}

export type ButtonTypes = 'delete' | 'newFolder' | 'intoFolder' | 'storageClass' | 'download';

export interface ShortcutButtonProps {
  buttonType: ButtonTypes;
  action: () => void;
}

export interface CheckCircleProps {
  checked: boolean;
}

export interface ListObjectProps {
  label: string;
  isSelected?: boolean;
  menuDisabled: boolean;
  storageClass?: string; // this needs to be updated to the actual classes
  // if it's the final list item in a series, we add a bottom line
  isFinal?: boolean;
  mainAction: () => void;
  secondaryAction: () => void;
}
