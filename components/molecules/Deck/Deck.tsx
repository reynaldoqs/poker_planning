import { motion } from "framer-motion";
import { Flex } from "theme-ui";

import { DeckItem } from "~/components/atoms";
import { DeckProps } from "./Deck.types";

const AnimatedFlex = motion(Flex);
const AnimatedDeckItem = motion(DeckItem);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Deck: React.FC<DeckProps> = ({
  currentPlayer,
  boardConfig,
  sx,
  onVoteSelected,
}) => {
  const middle = Math.round(boardConfig.voteValues.length / 2);
  const cardWidth = 50;

  const onVoteHandler = (value: string) => {
    const calculatedValue = value === currentPlayer?.voteValue ? null : value;
    onVoteSelected(calculatedValue);
  };

  return (
    <AnimatedFlex
      as="ul"
      variants={container}
      initial="hidden"
      animate="show"
      sx={{ gap: 3, ...sx }}
    >
      {boardConfig.voteValues.map((value, index) => (
        <AnimatedDeckItem
          as="li"
          key={value}
          value={value}
          isSelected={currentPlayer?.voteValue === value}
          //  layoutId={`${value}_${currentPlayer?.playerId}`}
          onClick={() => onVoteHandler(value)}
          variants={{
            hidden: {
              opacity: 0,
              transform: `perspective(80px) translateX(${
                (index + 1 - middle) * -1 * cardWidth
              }px) translateY(300px) rotateX(-90deg)`,
            },
            show: {
              opacity: 1,
              transform:
                "perspective(80px) translateX(0px) translateY(0px) rotateX(0deg)",
            },
          }}
        />
      ))}
    </AnimatedFlex>
  );
};
