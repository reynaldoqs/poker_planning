import { Box, Select as TSelect } from "theme-ui";

import { Typography } from "../Typography";
import { SelectProps } from "./Select.types";

export const Select = <T extends unknown>({
  label,
  options = [],
  sx,
  mt,
  mb,
  mx,
  my,
  mr,
  ml,
  ...rest
}: SelectProps<T>) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      bg: "backgroundDark",
      height: 8,
      borderRadius: 3,
      px: 3,
      py: 2,
      ...sx,
    }}
    {...{ mt, mb, mx, my, mr, ml }}
  >
    <Typography
      as="label"
      variant="caption2"
      color="textDark"
      sx={{ position: "absolute", top: "10px", left: "20px" }}
    >
      {label}
    </Typography>
    <TSelect
      sx={{
        bg: "backgroundDark",
        mt: "12px",
        border: "none",
        fontSize: 3,
        "&:focus": {
          outline: "none",
        },
      }}
      {...rest}
    >
      {options.map(({ label }, index) => (
        <option key={label} value={index}>
          {label}
        </option>
      ))}
    </TSelect>
  </Box>
);
