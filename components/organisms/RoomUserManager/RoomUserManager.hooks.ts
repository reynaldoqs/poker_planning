import { useEffect, useState } from "react";

import { PLAYER_TYPES } from "~/constants";
import { useRoomSocket, useUserAuth } from "~/context";
import { delay, userToPlayer } from "~/utils";

export const usePlayerCheckIn = () => {
  const { user } = useUserAuth();
  const { joined, joinCurrentRoom, updateCurrentPlayer, currentPlayer } =
    useRoomSocket();

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [roleModal, setRoleModal] = useState<boolean>(false);

  const onSelectRoleHandler = async (role: typeof PLAYER_TYPES[number]) => {
    if (!user) return;
    const userPlayer = userToPlayer(user, role);
    updateCurrentPlayer(userPlayer);
  };

  // @TODO: refactor to make it more understandable
  useEffect(() => {
    if (user) {
      setLoginModal(false);
      if (currentPlayer) {
        setRoleModal(false);
        if (!joined) {
          joinCurrentRoom();
        }
      } else {
        setRoleModal(true);
      }
    } else {
      setLoginModal(true);
    }
  }, [user, currentPlayer, updateCurrentPlayer, joined, joinCurrentRoom]);

  return {
    onRoleSelection: onSelectRoleHandler,
    showLoginModal: loginModal,
    showRoleModal: roleModal,
  };
};
