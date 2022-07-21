import { FlexProps } from "theme-ui";

import type { RecursivePartial, Room } from "~/types";

export type RoomBasicInputsProps = FlexProps & {
  currentRoomState: RecursivePartial<Room>;
  onInputsChange?: (advancedInputs: RecursivePartial<Room>) => void;
};
