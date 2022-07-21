import { BoxProps } from "theme-ui";

import { ADORNMENTS } from "./AdornmentList";

export type AdornmentProps = BoxProps & {
  adornment: keyof typeof ADORNMENTS;
  children?: React.ReactNode;
  align?: "top" | "bottom" | "middle";
};
