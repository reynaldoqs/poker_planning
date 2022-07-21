import { Box } from "theme-ui";

import { useRoomSocket, useUserAuth } from "~/context";

export const States: React.FC = () => {
  const { user } = useUserAuth();
  const {
    boardConfig,
    boardStatus,
    connected,
    joined,
    currentPlayer,
    players,
    roomConfig,
  } = useRoomSocket();
  return (
    <Box
      sx={{
        position: "absolute",
        right: 10,
        bottom: 10,
        bg: "black",
        fontSize: "12px",
        color: "skyblue",
        p: 2,
        maxWidth: "400px",
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      ROOM
      <pre>
        {JSON.stringify(
          {
            connected,
            joined,
            roomConfig,
            boardConfig,
            boardStatus,
            players,
          },
          null,
          2
        )}
      </pre>
      USER
      <pre>{JSON.stringify(user, null, 2)}</pre>
      CURRENT_PLAYER
      <pre>{JSON.stringify(currentPlayer, null, 2)}</pre>
    </Box>
  );
};
