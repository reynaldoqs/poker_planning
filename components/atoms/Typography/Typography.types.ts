import type { TextProps } from "theme-ui";

export type TypographyProps = TextProps & {
  as?: React.ElementType;
  variant?: string;
};
