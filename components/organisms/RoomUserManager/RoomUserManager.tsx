import { motion } from "framer-motion";
import { useRouter } from "next/router";
import print from "consola";

import { Modal } from "~/components/atoms";
import { MainRoleSelector, UserMenu } from "~/components/molecules";
import { useRoomSocket, useUserAuth } from "~/context";

import { LoginForm } from "../LoginForm";
import { LOGIN_KEY_ID } from "~/constants";
import { usePlayerCheckIn } from "./RoomUserManager.hooks";

export const RoomUserManager: React.FC = () => {
  const { user, signOut } = useUserAuth();
  const {
    updateCurrentPlayer,
    roomConfig,
    currentPlayer: player,
    leaveCurrentRoom,
  } = useRoomSocket();

  const { showLoginModal, showRoleModal, onRoleSelection } = usePlayerCheckIn();

  const router = useRouter();

  const logoutHandler = () => {
    leaveCurrentRoom();
    updateCurrentPlayer(null);
    signOut();
  };

  const onPlayerTypeToggleHandler = () => {
    const playerType = player?.type === "OBSERVER" ? "PLAYER" : "OBSERVER";
    updateCurrentPlayer({ type: playerType });
  };

  const onLeaveRoomHandler = () => {
    leaveCurrentRoom(); // It throws an error when disconnected at same time
    router.push("/");
    updateCurrentPlayer(null);
  };

  return (
    <>
      <Modal isOpen={showLoginModal} layoutId={LOGIN_KEY_ID}>
        <LoginForm />
      </Modal>
      <Modal isOpen={showRoleModal}>
        <MainRoleSelector
          onSelectRole={onRoleSelection}
          roomConfig={roomConfig}
          user={user}
        />
      </Modal>
      {user && player && (
        <motion.div layoutId={LOGIN_KEY_ID}>
          <UserMenu
            user={player}
            onLogout={logoutHandler}
            onPlayerTypeToggle={onPlayerTypeToggleHandler}
            onLeaveRoom={onLeaveRoomHandler}
          />
        </motion.div>
      )}
    </>
  );
};
