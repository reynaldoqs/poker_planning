import { Text } from "theme-ui";

import { TypographyProps, typographyVariants } from "./Typography.types";

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "text",
  gradient,
  sx,
  ...rest
}) => (
  <Text
    sx={{ ...typographyVariants[variant], ...sx }}
    variant={gradient ? "gradient" : undefined}
    color={color}
    {...rest}
  />
);
