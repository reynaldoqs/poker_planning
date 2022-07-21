import { ChangeEvent } from "react";
import { Flex, Label, Radio } from "theme-ui";

import { Typography } from "~/components/atoms";
import { MANAGE_OPTIONS } from "~/constants";

import { RoomAdvancedInputsProps } from "./RoomAdvancedInputs.types";

export const RoomAdvancedInputs: React.FC<RoomAdvancedInputsProps> = ({
  currentRoomState,
  sx,
  onInputsChange,
  ...rest
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onInputsChange?.({
        roomConfig: { whoCanManage: e.target.value as any },
      });
    }
  };

  return (
    <Flex
      sx={{ flexDirection: "column", alignItems: "flex-start", ...sx }}
      {...rest}
    >
      <Typography variant="body1" color="textDark">
        Who can manage room?
      </Typography>
      <Flex mt="5">
        {MANAGE_OPTIONS.map((option, index) => (
          <Label key={option} ml={index === MANAGE_OPTIONS.length - 1 ? 7 : 0}>
            <Radio
              value={option}
              checked={currentRoomState?.roomConfig?.whoCanManage === option}
              onChange={onChangeHandler}
            />
            <Typography
              variant="body2"
              color="textDark"
              sx={{
                whiteSpace: "nowrap",
                "&:first-letter": { textTransform: "capitalize" },
              }}
              mt="1"
            >
              {option.toLocaleLowerCase()}
            </Typography>
          </Label>
        ))}
      </Flex>
    </Flex>
  );
};
