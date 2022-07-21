import { FlexProps } from "theme-ui";

export type MenuItemProps = FlexProps & {
  adornment?: React.ReactNode;
  hasSeparator?: boolean;
  isSelectable?: boolean;
  children: React.ReactNode;
};
