import { Flex } from "theme-ui";
import { Typography } from "~/components/atoms";
import { useRoomSocket } from "~/context";

export const BoardHeader: React.FC = () => {
  const { updateCurrentPlayer, roomConfig } = useRoomSocket();
  return (
    <Flex sx={{ p: 4 }}>
      <Typography variant="heading1" color="textDark" sx={{ mr: 2 }}>
        Room:
      </Typography>
      <Typography variant="heading1" color="infoLight">
        {roomConfig.title}
      </Typography>
    </Flex>
  );
};
