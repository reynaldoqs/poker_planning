import { Flex, Box } from "theme-ui";
import { z } from "zod";

import { Typography } from "~/components/atoms";

import { AlertProps } from "./Alert.types";

const extractMessage = (alert: any) => {
  if (alert instanceof z.ZodError) {
    return alert.issues.map((issue, index) => (
      <Box key={index}>
        <Typography
          variant="body2"
          color="errorLight"
          sx={{
            borderWidth: "1px",
            borderColor: "errorLight",
            borderStyle: "solid",
            px: 2,
            py: 1,
            borderRadius: 1,
            mr: 2,
            textTransform: "capitalize",
          }}
        >
          {issue.path.at(-1)}
        </Typography>
        <Typography variant="caption1" color="errorLight">
          {issue.message}
        </Typography>
      </Box>
    ));
  }
  return (
    <Box>
      <Typography variant="caption2" color="errorLight">
        {JSON.stringify(alert, null, 2)}
      </Typography>
    </Box>
  );
};

export const Alert: React.FC<AlertProps> = ({
  alert,
  severity,
  sx,
  ...rest
}) => {
  if (!alert) return null;

  return (
    <Flex sx={{ textAlign: "left", ...sx }} {...rest}>
      {extractMessage(alert)}
    </Flex>
  );
};
