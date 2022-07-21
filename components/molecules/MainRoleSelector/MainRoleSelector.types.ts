import { PLAYER_TYPES } from "~/constants";
import { RoomConfig, User } from "~/types";

export type MainRoleSelectorProps = {
  user: User | null;
  roomConfig: RoomConfig | null;
  onSelectRole?: (role: typeof PLAYER_TYPES[number]) => void;
};
