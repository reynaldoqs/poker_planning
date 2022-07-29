import { Flex, FlexProps } from "theme-ui";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { Button, Typography } from "~/components/atoms";
import { DECK_CARDS, ROOM_KEY_ID } from "~/constants";
import {
  Alert,
  RoomAdvancedInputs,
  RoomBasicInputs,
} from "~/components/molecules";
import { useCreateRoom } from "~/services/room";
import { keyPressedTrigger } from "~/utils";
import type { RecursivePartial, Room } from "~/types";

const AnimatedFlex = motion(Flex);

const initialValues: Room = {
  roomConfig: {
    title: "",
    whoCanManage: "OWNER",
    authentication: { required: false },
  },
  boardConfig: {
    voteType: "STRING",
    voteValues: DECK_CARDS[0].value,
  },
  boardStatus: "INIT",
  players: [],
};

export const RoomCreationForm: React.FC<FlexProps> = ({ sx }) => {
  const router = useRouter();
  const { mutate, updateRoom, isLoading, room, error } =
    useCreateRoom(initialValues);

  const onCreateRoomHandler = async () => {
    const response = await mutate();
    if (!response) return;
    console.log("LA RESPUESTA", response);
    router.push(`room/${response.roomId}`);
  };

  const onChangeHandler = (room: RecursivePartial<Room>) => {
    updateRoom(room);
  };

  return (
    <AnimatedFlex
      sx={{
        width: "420px",
        maxWidth: "100%",
        px: 4,
        py: 5,
        borderRadius: 4,
        bg: "backgroundLight",
        ...sx,
      }}
      layoutId={ROOM_KEY_ID}
    >
      <Flex
        sx={{
          flexDirection: "column",
          textAlign: "center",
          p: 3,
        }}
        onKeyPress={keyPressedTrigger("Enter", onCreateRoomHandler)}
      >
        <Typography variant="subtitle" color="textLight">
          Create Room
        </Typography>
        <Typography variant="body2" mt="2" color="text">
          To start planning it is necessary a room, lets star by{" "}
          <Typography variant="body2" mt="2" color="infoLight">
            creating one!
          </Typography>
        </Typography>
        <RoomBasicInputs
          currentRoomState={room}
          onInputsChange={onChangeHandler}
          mt="5"
        />
        <RoomAdvancedInputs
          onInputsChange={onChangeHandler}
          currentRoomState={room}
          mt="5"
        />
        <Alert alert={error} severity="error" mt="5" />
        <Flex sx={{ justifyContent: "flex-end" }} mt="6">
          <Button onClick={onCreateRoomHandler} disabled={isLoading || !!error}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </AnimatedFlex>
  );
};
