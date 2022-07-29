import { motion } from "framer-motion";
import { Flex, Grid } from "theme-ui";
import Image from "next/image";

import { orderPlayersToSections } from "./GameTable.helper";
import { GameTableProps, TableSections } from "./GameTable.types";

const AnimatedFlex = motion(Flex);

export const GameTable: React.FC<GameTableProps> = ({
  votes,
  boardStatus,
  children,
  sx,
  ...rest
}) => {
  const playersOrdered = orderPlayersToSections(votes);

  const renderSection = (section: keyof TableSections) => (
    <>
      {playersOrdered[section].map((player) => (
        <Flex
          key={player.playerId}
          sx={{
            width: "60px",
            height: "80px",
            bg: "background",
            borderRadius: 3,
          }}
        >
          <Image
            src="/assets/card_bg.png"
            alt="poker planning logo"
            width="100%"
            height="100%"
          />
          {/* {player.voteValue} */}
        </Flex>
      ))}
    </>
  );

  return (
    <Grid
      sx={{
        width: "740px",
        height: "520px",
        gridTemplateAreas: `"left top right"
                            "left middle right"
                            "left bottom right"`,
        gridGap: 2,
        gridTemplateColumns: "110px 1fr 110px",
        gridTemplateRows: "110px 1fr 110px",

        ...sx,
      }}
    >
      <Flex
        sx={{
          gridArea: "left",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
          py: 2,
        }}
      >
        {renderSection("left")}
      </Flex>
      <Flex
        sx={{
          gridArea: "right",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          py: 2,
        }}
      >
        {renderSection("right")}
      </Flex>
      <Flex
        sx={{
          gridArea: "top",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
        }}
      >
        {renderSection("top")}
      </Flex>
      <Flex
        sx={{
          gridArea: "bottom",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        {renderSection("bottom")}
      </Flex>
      <Flex
        sx={{
          gridArea: "middle",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        {children}
      </Flex>
    </Grid>
  );
};
