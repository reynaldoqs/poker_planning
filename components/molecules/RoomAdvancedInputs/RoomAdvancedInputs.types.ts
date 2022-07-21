import { FlexProps } from "theme-ui";

import { RecursivePartial, Room } from "~/types";

export type RoomAdvancedInputsProps = FlexProps & {
  currentRoomState: RecursivePartial<Room>;
  onInputsChange?: (advancedInputs: RecursivePartial<Room>) => void;
};
