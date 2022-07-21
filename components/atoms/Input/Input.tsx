import { forwardRef } from "react";
import { Box, Input as TUInput } from "theme-ui";

import { Typography } from "../Typography";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, margin, mx, my, mt, mb, ...rest }, ref) => {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          bg: "backgroundDark",
          height: 8,
          borderRadius: 3,
          px: 3,
          py: 2,
          margin,
          mx,
          my,
          mt,
          mb,
        }}
      >
        <Typography
          as="label"
          variant="caption2"
          color="textDark"
          sx={{ position: "absolute", top: "10px", left: "20px" }}
        >
          {label}
        </Typography>
        <TUInput
          ref={ref}
          sx={{
            mt: "12px",
            borderRadius: 0,
            border: "none",
            fontSize: 3,
            "&:focus": {
              outline: "none",
            },
          }}
          {...rest}
        />
      </Box>
    );
  }
);

Input.displayName = "Input";
