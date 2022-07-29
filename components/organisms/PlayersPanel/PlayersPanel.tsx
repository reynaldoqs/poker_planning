import { Flex } from "theme-ui";
import { Adornment, Button, Typography } from "~/components/atoms";
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
      <Adornment adornment="circle1" align="top">
        <Typography variant="heading1" sx={{ pl: 1, pr: 2 }}>
          Players
        </Typography>
      </Adornment>

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
