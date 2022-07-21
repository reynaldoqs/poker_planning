import { Flex, Text } from "theme-ui";
import { Button, Typography } from "~/components/atoms";
import { MainRoleSelectorProps } from "./MainRoleSelector.types";

export const MainRoleSelector: React.FC<MainRoleSelectorProps> = ({
  user,
  roomConfig,
  onSelectRole,
}) => {
  return (
    <Flex
      sx={{
        p: 4,
        pb: 5,
        bg: "background",
        flexDirection: "column",
        borderRadius: 4,
        maxWidth: "100%",
        width: "350px",
      }}
    >
      <Flex sx={{ textAlign: "center", my: 3 }}>
        <Typography variant="body2">
          Are going to join to{" "}
          <Typography variant="body2" color="info">
            {roomConfig?.title}
          </Typography>{" "}
          poker planning{user ? " as " : "."}
          <Typography variant="body2" color="info">
            {user ? `${user.displayName}.` : ""}
          </Typography>
        </Typography>
      </Flex>
      <Typography
        variant="body2"
        color="warningLight"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Choose your role
      </Typography>
      <Flex sx={{ gap: 4, mt: 3 }}>
        <Button
          onClick={() => onSelectRole?.("PLAYER")}
          size="sm"
          variant="outlined"
          sx={{ flex: 1 }}
        >
          <Text sx={{ mr: 1, fontSize: 4 }}>🙋‍♂️</Text>Player
        </Button>
        <Button
          onClick={() => onSelectRole?.("OBSERVER")}
          size="sm"
          variant="outlined"
          sx={{ flex: 1 }}
        >
          <Text sx={{ mr: 1, fontSize: 4 }}>👻</Text>Observer
        </Button>
      </Flex>
    </Flex>
  );
};
