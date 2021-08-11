export enum Size {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  EXTRALARGE = 'xl',
}

export class ModalConfig {
  centered: boolean = false;
  size: Size = Size.SMALL;
  scrollable: boolean = false;
}
