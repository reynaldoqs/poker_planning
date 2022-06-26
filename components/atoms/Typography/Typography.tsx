import { Text } from "theme-ui";

import type { TypographyProps } from "./Typography.types";

export const Typography: React.FC<TypographyProps> = ({ variant, ...rest }) => (
  <Text {...rest} />
);
