import { useEffect, useReducer, useState } from "react";

import { PLAYER_TYPES } from "~/constants";
import { useRoomSocket, useUserAuth } from "~/context";
import { delay, userToPlayer } from "~/utils";

type ModalsState = {
  login: boolean;
  roleSelector: boolean;
};

enum ModalChangeKind {
  CLOSE_LOGIN = "CLOSE_LOGIN",
  OPEN_LOGIN = "OPEN_LOGIN",
  CLOSE_ROLE_SELECTOR = "CLOSE_ROLE_SELECTOR",
  OPEN_ROLE_SELECTOR = "OPEN_ROLE_SELECTOR",
}

function modalsChangeReducer(state: ModalsState, action: ModalChangeKind) {
  switch (action) {
    case ModalChangeKind.OPEN_LOGIN:
      return {
        ...state,
        login: true,
      };
    case ModalChangeKind.CLOSE_LOGIN:
      return {
        ...state,
        login: false,
      };
    case ModalChangeKind.OPEN_ROLE_SELECTOR:
      return {
        ...state,
        roleSelector: true,
      };
    case ModalChangeKind.CLOSE_ROLE_SELECTOR:
      return {
        ...state,
        roleSelector: false,
      };
    default:
      return state;
  }
}

export const usePlayerCheckIn = () => {
  const { user } = useUserAuth();
  const { joined, joinCurrentRoom, updateCurrentPlayer, currentPlayer } =
    useRoomSocket();

  const [state, dispatch] = useReducer(modalsChangeReducer, {
    login: false,
    roleSelector: false,
  });

  const onSelectRoleHandler = async (role: typeof PLAYER_TYPES[number]) => {
    if (joined) {
      console.log("player is joinend and it cant be modified");
      return;
    }
    if (!user) {
      console.log("no user here");
      return;
    }

    const userPlayer = userToPlayer(user, role);
    updateCurrentPlayer(userPlayer);
  };

  useEffect(() => {
    if (!user) {
      dispatch(ModalChangeKind.OPEN_LOGIN);
    } else {
      dispatch(ModalChangeKind.CLOSE_LOGIN);
    }
  }, [user]);

  useEffect(() => {
    if (!currentPlayer && user) {
      dispatch(ModalChangeKind.OPEN_ROLE_SELECTOR);
    } else {
      dispatch(ModalChangeKind.CLOSE_ROLE_SELECTOR);
    }
  }, [currentPlayer, user]);

  // const onOpenLoginHandler = () => {
  //   setLoginStep(true);
  // };

  // const onCloseLoginHandler = () => {
  //   setLoginStep(false);
  // };

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (user) {
  //       console.log("entrando por true USER");
  //       setLoginStep(false);
  //       await delay(300);

  //       setRoleSelectionStep(true);
  //     } else {
  //       console.log("entrando por FALSE USER");
  //       setLoginStep(true);
  //     }
  //   };
  //   verifyUser();
  // }, [user]);

  // useEffect(() => {
  //   if (!joined) {
  //     setRoleSelectionStep(true);
  //   } else {
  //     setRoleSelectionStep(false);
  //   }
  // }, [joined]);

  // const isCurrentPlayerFullFilled = Boolean(
  //   currentPlayer?.name &&
  //     currentPlayer?.playerId &&
  //     currentPlayer?.provider &&
  //     currentPlayer?.type
  // );

  // useEffect(() => {
  //   if (joined || !user) return;

  //   if (isCurrentPlayerFullFilled) {
  //     joinCurrentRoom();
  //   } else if (currentPlayer?.type) {
  //     const player = userToPlayer(user, currentPlayer.type);
  //     updateCurrentPlayer(player);
  //   }
  // }, [
  //   user,
  //   currentPlayer,
  //   joinCurrentRoom,
  //   isCurrentPlayerFullFilled,
  //   updateCurrentPlayer,
  //   joined,
  // ]);

  return {
    onRoleSelection: onSelectRoleHandler,
    showLoginModal: state.login,
    showRoleModal: state.roleSelector,
  };
};
