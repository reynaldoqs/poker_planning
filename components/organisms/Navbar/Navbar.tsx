import { Box, Flex } from "theme-ui";

import { NavbarProps } from "./Navbar.types";

export const Navbar: React.FC<NavbarProps> = ({ userManager }) => {
  return (
    <Flex
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        px: 5,
      }}
    >
      <Box>{userManager}</Box>
    </Flex>
  );
};
