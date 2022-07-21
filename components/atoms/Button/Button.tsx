import { forwardRef } from "react";
import { Button as TUButton } from "theme-ui";
import { useTheme } from "~/hooks";

import { Typography } from "../Typography";
import { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, size = "md", variant = "primary", disabled, sx, ...rest },
    ref
  ) => {
    const { theme } = useTheme();
    const getBg = {
      primary: "linear-gradient(180deg, #5764F0 0%, #3C45A7 100%)",
      secondary: theme.colors.secondary,
      clean: "transparent",
      outlined: "transparent",
    };

    const isMdSize = size === "md";
    const isOutlined = variant === "outlined";
    const getBorderRadius = {
      primary: isMdSize ? 2 : 1,
      secondary: isMdSize ? 2 : 1,
      clean: isMdSize ? 2 : 1,
      outlined: 3,
    };

    return (
      <TUButton
        ref={ref}
        disabled={disabled}
        {...rest}
        sx={{
          border: isOutlined ? "solid 1px" : "none",
          borderColor: isOutlined ? "textDark" : "transparent",
          bg: getBg[variant],
          backgroundImage: getBg[variant],
          cursor: disabled ? "not-allowed" : "pointer",
          px: 4,
          py: isMdSize ? "14px" : "12px",
          borderRadius: getBorderRadius[variant],
          filter: disabled ? "grayscale(80%)" : "none",
          "&:active": {
            opacity: disabled ? 1 : 0.7,
          },
          ...sx,
        }}
      >
        <Typography
          variant={isMdSize ? "button1" : "button2"}
          color={isOutlined ? "text" : "textLight"}
          sx={{ mx: isMdSize ? "6px" : 0, whiteSpace: "nowrap" }}
        >
          {children}
        </Typography>
      </TUButton>
    );
  }
);

Button.displayName = "Button";
