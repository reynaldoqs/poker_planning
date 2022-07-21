import { FlexProps } from "theme-ui";

export type AlertProps = FlexProps & {
  alert?: any;
  severity?: "error" | "info";
};
