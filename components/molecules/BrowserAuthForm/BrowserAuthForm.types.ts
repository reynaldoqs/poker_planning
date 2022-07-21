import { FlexProps } from "theme-ui";

export type BrowserAuthFormProps = FlexProps & {
  onLogin: (userName: string) => void;
};
