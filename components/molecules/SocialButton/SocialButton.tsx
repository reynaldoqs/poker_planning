import { Form } from "@remix-run/react";

import type { SocialButtonProps } from "./SocialButton.types";

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  label,
}) => (
  <Form action={`/auth/${provider}`} method="post">
    <button>{label}</button>
  </Form>
);
