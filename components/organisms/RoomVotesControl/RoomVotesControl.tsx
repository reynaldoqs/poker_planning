import { useState } from "react";
import { Flex } from "theme-ui";

import { Deck } from "~/components/molecules";
import { useRoomSocket } from "~/context";
import { Player } from "~/types";

export const RoomVotesControl: React.FC = () => {
  const { currentPlayer, joined, boardConfig, updatePlayerVote } =
    useRoomSocket();

  const onVoteSelectedHandler = (value: string | null) => {
    updatePlayerVote(value);
  };

  const hasDeck = joined && currentPlayer && boardConfig.voteValues.length;
  return (
    <Flex sx={{ justifyContent: "center" }}>
      {hasDeck && (
        <Deck
          boardConfig={boardConfig}
          currentPlayer={currentPlayer}
          onVoteSelected={onVoteSelectedHandler}
        />
      )}
    </Flex>
  );
};
