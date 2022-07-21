import { User } from "~/types";

export type UserMenuProps = {
  user: User | null;
  onLogout?: () => void;
  onUserNameChange?: (value: string) => void;
};
