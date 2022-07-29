import { Box } from "theme-ui";

import { AdornmentProps } from "./Adornment.types";
import { ADORNMENTS } from "./AdornmentList";

const alignMap: Record<
  Exclude<AdornmentProps["align"], undefined>,
  `${number}px`
> = {
  top: "-10px",
  bottom: "10px",
  middle: "2px",
};

export const Adornment: React.FC<AdornmentProps> = ({
  adornment,
  children,
  align = "bottom",
  sx,
  ...rest
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        display: "inline-block",
        ...sx,
      }}
      {...rest}
    >
      {children}
      <Box
        sx={{
          position: "absolute",
          top: alignMap[align],
        }}
      >
        {ADORNMENTS[adornment]}
      </Box>
    </Box>
  );
};
