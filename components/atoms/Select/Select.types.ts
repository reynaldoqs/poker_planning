import { SelectProps as TSelectProps } from "theme-ui";

export type SelectProps<T> = TSelectProps & {
  label?: string;
  options: { label: string; value: T }[];
};
