import { forwardRef } from "react";
import { Box, Input as TUInput } from "theme-ui";

import { Typography } from "~/components/atoms";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <Box
        sx={{
          width: "100%",
          bg: "backgroundDarker",
          height: 8,
          borderRadius: 3,
          px: 3,
          py: 2,
          mb: 3,
        }}
      >
        <Typography
          as="label"
          htmlFor={rest.id}
          sx={{ fontSize: 1, position: "relative", top: 1, left: 2 }}
        >
          {label}
        </Typography>
        <TUInput ref={ref} sx={{ fontSize: 2 }} {...rest} />
      </Box>
    );
  }
);

Input.displayName = "Input";
