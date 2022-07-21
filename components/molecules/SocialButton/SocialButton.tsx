import { Button, Icon } from "~/components/atoms";
import { extractProviderIcon } from "~/utils";

import type { SocialButtonProps } from "./SocialButton.types";

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  label,
  onLogin,
  ...rest
}) => (
  <Button onClick={() => onLogin?.(provider)} variant="clean" {...rest}>
    <Icon icon={extractProviderIcon(provider)} sx={{ fontSize: 6, mr: 3 }} />
    {label}
  </Button>
);
