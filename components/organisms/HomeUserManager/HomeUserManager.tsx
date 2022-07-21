import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button, Modal } from "~/components/atoms";
import { UserMenu } from "~/components/molecules";
import { LOGIN_KEY_ID } from "~/constants";
import { useUserAuth } from "~/context";

import { LoginForm } from "../LoginForm";

const AnimatedButton = motion(Button);

export const HomeUserManager: React.FC = () => {
  const { user, signOut } = useUserAuth();
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    if (user) setLoginModal(false);
  }, [user]);

  return (
    <>
      <Modal
        isOpen={loginModal}
        onClose={() => setLoginModal(false)}
        layoutId={LOGIN_KEY_ID}
      >
        <LoginForm />
      </Modal>
      {user ? (
        <motion.div layoutId={LOGIN_KEY_ID}>
          <UserMenu user={user} onLogout={signOut} />
        </motion.div>
      ) : (
        <AnimatedButton
          variant="secondary"
          size="sm"
          onClick={() => setLoginModal(true)}
          layoutId={LOGIN_KEY_ID}
        >
          Login
        </AnimatedButton>
      )}
    </>
  );
};
