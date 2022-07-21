import { Box, Flex, FlexProps } from "theme-ui";
import Image from "next/image";

import { Adornment, Typography } from "~/components/atoms";

export const Brand: React.FC<FlexProps> = ({ sx, ...rest }) => (
  <Flex
    sx={{
      width: "fit-content",
      borderColor: "backgroundLight",
      borderStyle: "solid",
      borderWidth: "2px",
      padding: 4,
      borderRadius: 4,
      ...sx,
    }}
    {...rest}
  >
    <Box sx={{ size: "58px", mt: 2 }}>
      <Image
        src="/assets/logo_white.png"
        alt="poker planning logo"
        width="100%"
        height="100%"
      />
    </Box>
    <Flex sx={{ flexDirection: "column", ml: 4 }}>
      <Typography variant="title" color="textLight" gradient>
        Poker Planning
      </Typography>
      <Typography variant="body2" mt="2" sx={{ lineHeight: "24px" }}>
        Create better estimates, healthier sprints,
        <Adornment adornment="line1" sx={{ display: "block" }}>
          and happier teams.
        </Adornment>
      </Typography>
    </Flex>
  </Flex>
);
