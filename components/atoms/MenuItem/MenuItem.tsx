import { Box, Flex } from "theme-ui";

import { MenuItemProps } from "./MenuItem.types";

export const MenuItem: React.FC<MenuItemProps> = ({
  adornment,
  hasSeparator,
  isSelectable = true,
  children,
  ...rest
}) => (
  <>
    {hasSeparator && (
      <Box
        sx={{
          borderTopColor: "background",
          borderTopWidth: "1px",
          borderTopStyle: "dashed",
          my: 3,
        }}
      />
    )}
    <Flex
      as="li"
      sx={{
        px: 3,
        py: 2,
        cursor: "default",
        alignItems: "center",
        ...(isSelectable && {
          cursor: "pointer",
          "&:hover": { bg: "background" },
        }),
      }}
      {...rest}
    >
      <Flex sx={{ flex: 1, justifyContent: "center" }}>{adornment}</Flex>
      <Flex variant="body2" sx={{ flex: 4, pl: 2 }}>
        {children}
      </Flex>
    </Flex>
  </>
);
