import { forwardRef } from "react";
import { Flex } from "theme-ui";

import { Typography } from "../Typography";
import { DeckItemProps } from "./DeckItem.types";

export const DeckItem = forwardRef<HTMLDivElement, DeckItemProps>(
  ({ value, isSelected, sx, ...rest }, ref) => {
    return (
      <Flex
        ref={ref}
        sx={{
          width: "63px",
          height: "85px",
          bg: "background",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
          borderRadius: 2,
          cursor: "pointer",
          filter: `opacity(${isSelected ? 30 : 100}%)`,
          flexDirection: "column",
        }}
        {...rest}
      >
        <Typography variant="subtitle">{value}</Typography>
      </Flex>
    );
  }
);

DeckItem.displayName = "DeckItem";
