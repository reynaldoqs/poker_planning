import { BoxProps } from "theme-ui";

import { BoardConfig, Player } from "~/types";

export type DeckProps = BoxProps & {
  currentPlayer: Player | null;
  boardConfig: BoardConfig;
  onVoteSelected: (value: string | null) => void;
};
