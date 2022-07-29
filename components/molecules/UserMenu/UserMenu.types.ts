import { Player, User } from "~/types";

export type UserMenuProps = {
  user: User | Player | null;
  userType?: "user" | "player";
  onLogout?: () => void;
  onUserNameChange?: (value: string) => void;
  onPlayerTypeToggle?: () => void;
  onLeaveRoom?: () => void;
};
