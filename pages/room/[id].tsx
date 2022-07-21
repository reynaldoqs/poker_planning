import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import io from "Socket.IO-client";
import { Box, Flex, Grid } from "theme-ui";

import {
  BoardHeader,
  Navbar,
  PlayersPanel,
  RoomUserManager,
} from "~/components";
import { States } from "~/components/atoms/States";
import { ROOM_KEY_ID } from "~/constants";
import { RoomSocketProvider } from "~/context";
import { getRoom } from "~/models";
import { DocumentRoom } from "~/types";
import dbConnect from "~/utils/dbConnect";

export const getServerSideProps = async ({ params }: any) => {
  await dbConnect();
  const room = await getRoom(params.id);
  return { props: { room: JSON.parse(JSON.stringify(room)) } };
};

const AnimatedGrid = motion(Grid);
type RoomProps = {
  readonly room: DocumentRoom;
};

const DESKTOP_AREAS = `"nav nav"
"main sidebar"`;

const Room: React.FC<RoomProps> = ({ room }) => {
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   const socketInitializer = async () => {
  //     await fetch("/api/socket");
  //     socket = io();

  //     socket.on("connect", () => {
  //       console.log("connected");
  //     });

  //     socket.on("update-input", (msg: any) => {
  //       setInput(msg);
  //     });
  //   };
  //   socketInitializer();
  // }, []);

  // const onChangeHandler = (e: any) => {
  //   setInput(e.target.value);
  //   socket.emit("input-change", e.target.value);
  // };

  return (
    <RoomSocketProvider room={room}>
      <Grid
        gap={0}
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "backgroundDark",
          gridTemplateColumns: "1fr 280px",
          gridTemplateRows: "110px auto",
          gridTemplateAreas: DESKTOP_AREAS,
        }}
      >
        <Flex sx={{ gridArea: "nav" }}>
          <Navbar userManager={<RoomUserManager />} />
        </Flex>
        <AnimatedGrid
          gap={0}
          sx={{
            gridArea: "main",
            gridTemplateColumns: "240px 1fr",
            gridTemplateRows: "1fr",
            size: "100%",
            bg: "backgroundLight",
            borderTopRightRadius: 7,
          }}
          layoutId={ROOM_KEY_ID}
        >
          <Box sx={{ bg: "background" }}>
            <PlayersPanel />
          </Box>
          <Grid sx={{ gridTemplateRows: "70px 1fr 170px" }}>
            <BoardHeader />
            <Box>as</Box>
            <Box>ws</Box>
          </Grid>
        </AnimatedGrid>
        <Flex sx={{ size: "100%", gridArea: "sidebar" }}></Flex>
      </Grid>
      <States />
    </RoomSocketProvider>
  );
};

export default Room;
