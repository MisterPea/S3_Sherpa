export interface ButtonProps {
  label: string;
  icon?: any;
  // default: 'content'
  width?: 'content' | 'full';
  // default: 'primary'
  type?: 'primary' | 'secondary' | 'destructive';
  // button has plus icon added - default: false
  plusIcon?: boolean;
}
