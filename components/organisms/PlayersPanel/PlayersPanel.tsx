import { Flex } from "theme-ui";
import { Button, Typography } from "~/components/atoms";
import { PlayerItem } from "~/components/molecules";
import { useRoomSocket } from "~/context";

export const PlayersPanel: React.FC = () => {
  // const { user, signOut } = useUserAuth();
  const { updateCurrentPlayer, roomConfig, players } = useRoomSocket();
  return (
    <Flex
      sx={{
        p: 4,
        flexDirection: "column",
        height: "100%",
        gap: 5,
        userSelect: "none",
      }}
    >
      <Typography variant="heading1">Players</Typography>
      <Flex
        sx={{
          flex: 1,
          flexDirection: "column",
          gap: 3,
          overflowY: "auto",
        }}
      >
        {players.map((player) => (
          <PlayerItem key={player.playerId} player={player} />
        ))}
      </Flex>
      <Flex sx={{ p: 3, justifyContent: "center" }}>
        <Button size="sm">Invite Player</Button>
      </Flex>
    </Flex>
  );
};
