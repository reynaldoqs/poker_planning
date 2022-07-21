import { Flex } from "theme-ui";
import { motion } from "framer-motion";

import { Button, Modal } from "~/components/atoms";
import { MainRoleSelector, UserMenu } from "~/components/molecules";
import { useRoomSocket, useUserAuth } from "~/context";

import { LoginForm } from "../LoginForm";
import { LOGIN_KEY_ID } from "~/constants";
import { usePlayerCheckIn } from "~/hooks";

const AnimatedButton = motion(Button);

export const RoomUserManager: React.FC = () => {
  const { user, signOut } = useUserAuth();
  const { updateCurrentPlayer, roomConfig } = useRoomSocket();

  const { showLoginModal, showRoleModal, onRoleSelection } = usePlayerCheckIn();

  const logoutHandler = () => {
    updateCurrentPlayer(null);
    signOut();
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
      {
        user ? (
          <motion.div layoutId={LOGIN_KEY_ID}>
            <UserMenu user={user} onLogout={logoutHandler} />
          </motion.div>
        ) : null
        // <AnimatedButton
        //   variant="secondary"
        //   size="sm"
        //   onClick={onOpenLogin}
        //   layoutId={LOGIN_KEY_ID}
        // >
        //   Login
        // </AnimatedButton>
      }
    </>
  );
};
