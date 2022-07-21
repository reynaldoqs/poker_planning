import { useEffect, useRef } from "react";
import { Flex } from "theme-ui";

import { Input, Select } from "~/components/atoms";
import { DECK_CARDS } from "~/constants";

import { RoomBasicInputsProps } from "./RoomBasicInputs.types";

export const RoomBasicInputs: React.FC<RoomBasicInputsProps> = ({
  currentRoomState,
  sx,
  onInputsChange,
  ...rest
}) => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (roomNameRef.current) roomNameRef.current.focus();
  }, []);

  return (
    <Flex sx={{ flexDirection: "column", ...sx }} {...rest}>
      <Input
        ref={roomNameRef}
        label="Room title"
        onChange={(val) => {
          onInputsChange?.({ roomConfig: { title: val.target.value } });
        }}
      />
      <Select
        options={DECK_CARDS}
        label="Deck"
        mt="4"
        onChange={(val) => {
          onInputsChange?.({
            boardConfig: {
              voteValues: DECK_CARDS[Number(val.target.value)].value,
            },
          });
        }}
      />
    </Flex>
  );
};
