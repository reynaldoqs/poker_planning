import { BoxProps } from "theme-ui";

import { TypographyProps } from "../../atoms/Typography/Typography.types";

export type EditableTextProps = BoxProps & {
  editable?: boolean;
  textVariant?: TypographyProps["variant"];
  onTextChange?: (value: string) => void;
};
