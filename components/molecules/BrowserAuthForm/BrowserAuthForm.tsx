import { useEffect, useRef } from "react";
import { Flex } from "theme-ui";
import { z } from "zod";

import { Button, Input } from "~/components/atoms";

import { BrowserAuthFormProps } from "./BrowserAuthForm.types";

export const BrowserAuthForm: React.FC<BrowserAuthFormProps> = ({
  onLogin,
  sx,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userNameSchema = z.string().min(2).max(20);

  const onLoginAction = () => {
    const userNameInput = inputRef.current?.value;
    if (!userNameInput) return;
    try {
      userNameSchema.parse(userNameInput);
      onLogin(userNameInput);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return;
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <Flex sx={{ flexDirection: "column", ...sx }} {...rest}>
      <Input ref={inputRef} label="User name" />
      <Button variant="secondary" onClick={onLoginAction} sx={{ mt: 5 }}>
        Continue
      </Button>
    </Flex>
  );
};
