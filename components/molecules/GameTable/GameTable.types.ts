import { BoxProps } from "theme-ui";

import { BoardStatus, Player } from "~/types";

export type GameTableProps = BoxProps & {
  votes: Player[];
  boardStatus: BoardStatus;
};

export type TableSections = {
  left: Player[];
  right: Player[];
  top: Player[];
  bottom: Player[];
};
