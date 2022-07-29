import { Box, Flex, FlexProps } from "theme-ui";
import Image from "next/image";

import { Adornment, Avatar, Typography } from "~/components/atoms";

export const AudiSign: React.FC<FlexProps> = ({ sx, ...rest }) => (
  <Flex
    sx={{
      width: "fit-content",
      alignItems: "center",
      ...sx,
    }}
    {...rest}
  >
    <Avatar
      src="/assets/audi.png"
      alt="Reynaldo logo"
      sx={{ size: "48px", mr: 3 }}
    />

    <Flex sx={{ flexDirection: "column" }}>
      <Typography variant="body2" color="textLight">
        Hecho en DreamWeaver por <Adornment adornment="line3">Audi</Adornment>
      </Typography>
      <Typography variant="caption1" color="textDark">
        reynaldoqs@gmail.com
      </Typography>
    </Flex>
  </Flex>
);
