import { Box, Flex } from "theme-ui";

import { Avatar, Typography } from "~/components/atoms";

import { PlayerItemProps } from "./PlayerItem.types";

export const PlayerItem: React.FC<PlayerItemProps> = ({ player }) => {
  const isObserver = player.type === "OBSERVER";
  const isDisconnected = player.status === "CONNECTED";
  return (
    <Flex
      sx={{
        alignItems: "center",
        gap: 3,
        position: "relative",
        filter: isDisconnected ? "grayscale(90%)" : "none",
      }}
    >
      <Avatar
        src={player.avatar}
        alt={player.name}
        sx={{ borderRadius: 2, size: "42px", overflow: "hidden" }}
      />
      <Box>
        <Typography variant="body2">{player.name}</Typography>
        {isObserver && (
          <Typography
            variant="caption2"
            color="warningLight"
            sx={{ display: "block" }}
          >
            Observer
          </Typography>
        )}
      </Box>
    </Flex>
  );
};
