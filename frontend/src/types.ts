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

export type ButtonTypes = 'delete' | 'newFolder' | 'intoFolder' | 'storageClass' | 'download' | 'meatball';

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

export type Region = 'us-east-2' | 'us-east-1' | 'us-west-1' | 'us-west-2' | 'af-south-1' | 'ap-east-1' | 'ap-south-1' | 'ap-northeast-3' | 'ap-northeast-2' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-northeast-1' | 'ca-central-1' | 'eu-central-1' | 'eu-west-1' | 'eu-west-2' | 'eu-south-1' | 'eu-west-3' | 'eu-north-1' | 'me-south-1' | 'sa-east-1';

export interface BucketCardProps {
  label: string;
  date: string;
  region: Region;
  isPublic: boolean;
  // This is true when there's a card with the context menu open
  activeState: boolean;
  // mainAction: (bucketInfo: any) => void;
  toggleActiveState: () => void;
}

export interface BucketModalProps {
  // bucketName: string;
  // region: Region;
  isDeletable: boolean;
}
