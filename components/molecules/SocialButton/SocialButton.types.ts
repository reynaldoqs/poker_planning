import { ButtonProps } from "~/components/atoms/Button/Button.types";
import { AUTH_PROVIDERS } from "~/constants";

export type SocialButtonProps = ButtonProps & {
  label: string;
  provider: keyof typeof AUTH_PROVIDERS;
  onLogin?: (provider: keyof typeof AUTH_PROVIDERS) => void;
};
