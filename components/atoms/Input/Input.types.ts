import type { InputProps as TUInputProps } from "theme-ui";

export type InputProps = React.ComponentPropsWithoutRef<"input"> &
  TUInputProps & {
    as?: React.ElementType;
    label?: string;
  };
