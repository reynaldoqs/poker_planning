import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Box, Flex } from "theme-ui";

import type { ModalProps } from "./Modal.types";

const AnimatedBox = motion(Box);
const AnimatedFlex = motion(Flex);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  layoutId,
  onClose,
}) => {
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  const onEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      return onClose?.();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onEscapeKeyDown);
    return () => {
      document.body.removeEventListener("keydown", onEscapeKeyDown);
    };
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <AnimatedFlex
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(3px)",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
          onClick={onClose}
        >
          <AnimatedBox
            transition={{ duration: 0.4 }}
            sx={{
              width: "fit-content",
            }}
            onClick={(e) => e.stopPropagation()}
            layoutId={layoutId}
          >
            {children}
          </AnimatedBox>
        </AnimatedFlex>
      )}
    </AnimatePresence>
  );
};
