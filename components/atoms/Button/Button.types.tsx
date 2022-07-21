import { ButtonProps as TUButtonProps } from "theme-ui";

export type ButtonProps = TUButtonProps &
  React.ComponentPropsWithoutRef<"button"> & {
    size?: "md" | "sm";
    variant?: "primary" | "secondary" | "clean" | "outlined";
  };
