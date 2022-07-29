import { Flex } from "theme-ui";

import { GameTable } from "~/components/molecules";
import { useRoomSocket } from "~/context";

export const Board: React.FC = () => {
  const { players, boardStatus } = useRoomSocket();
  return (
    <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
      <GameTable votes={players} boardStatus={boardStatus} />
    </Flex>
  );
};
