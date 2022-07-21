import { Box, Flex, FlexProps, Text } from "theme-ui";

import { Typography, Adornment } from "~/components/atoms";
import { PLAN_BENEFITS } from "~/constants";

export const PlansBanner: React.FC<FlexProps> = ({ sx, ...rest }) => (
  <Flex
    sx={{
      width: "fit-content",
      bg: "background",
      borderRadius: 4,
      overflow: "hidden",
      flexDirection: "column",
      ...sx,
    }}
    {...rest}
  >
    <Flex as="ul" sx={{ flexDirection: "column", p: 5 }}>
      <Typography variant="heading1" mb="2">
        Feel free to:
      </Typography>
      {PLAN_BENEFITS.free.map((benefit) => (
        <Box as="li" key={benefit.label} sx={{ mt: 2 }}>
          <Text sx={{ fontSize: 6, mr: 3 }}>{benefit.icon}</Text>
          <Typography variant="body2" color="textDark">
            {benefit.label}
          </Typography>
        </Box>
      ))}
    </Flex>
    <Flex as="ul" sx={{ bg: "gold", flexDirection: "column", p: 5 }}>
      <Typography variant="heading1" color="black" mb="2">
        Be <Adornment adornment="line2">premium </Adornment> to:
      </Typography>
      {PLAN_BENEFITS.premium.map((benefit) => (
        <Box as="li" key={benefit.label} sx={{ mt: 2 }}>
          <Text sx={{ fontSize: 6, mr: 3 }}>{benefit.icon}</Text>
          <Typography variant="body2" color="black">
            {benefit.label}
          </Typography>
        </Box>
      ))}
    </Flex>
  </Flex>
);
