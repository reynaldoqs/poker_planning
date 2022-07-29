import { Player } from "~/types";
import { TableSections } from "./GameTable.types";

export const orderPlayersToSections = (players: Player[]) => {
  return players.reduce(
    (acc: TableSections, player: Player, index: number) => {
      index = index + 1;
      if (index % 4 === 0) return { ...acc, left: [...acc.left, player] };
      if (index % 3 === 0) return { ...acc, right: [...acc.right, player] };
      if (index % 2 === 0) return { ...acc, top: [...acc.top, player] };
      return { ...acc, bottom: [...acc.bottom, player] };
    },
    {
      left: [],
      right: [],
      top: [],
      bottom: [],
    }
  );
};
