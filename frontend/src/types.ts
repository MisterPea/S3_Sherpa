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
