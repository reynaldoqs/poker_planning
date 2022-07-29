import { Box, Flex } from "theme-ui";
import {
  faArrowRightFromBracket,
  faPersonThroughWindow,
  faToggleOff,
  faToggleOn,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Avatar, Icon, MenuItem, Popup, Typography } from "~/components/atoms";
import { extractProviderIcon, isPlayer } from "~/utils";

import { UserMenuProps } from "./UserMenu.types";
import { EditableText } from "../EditableText";

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  userType = "user",
  onLogout,
  onUserNameChange,
  onPlayerTypeToggle,
  onLeaveRoom,
}) => {
  if (!user) return null;

  let displayName: string;
  let subtitle: string;
  let mainMenu: React.ReactNode;

  if (isPlayer(user)) {
    const isObserver = user.type === "OBSERVER";
    displayName = user.name;
    subtitle = user.type;
    mainMenu = (
      <>
        <MenuItem
          hasSeparator
          onClick={onPlayerTypeToggle}
          adornment={<Icon icon={isObserver ? faToggleOn : faToggleOff} />}
        >
          <Typography variant="body2">Observer mode</Typography>
        </MenuItem>
        <MenuItem adornment={<Icon icon={faPenToSquare} />}>
          <Typography variant="body2">Edit room</Typography>
        </MenuItem>
        <MenuItem
          onClick={onLeaveRoom}
          adornment={<Icon icon={faPersonThroughWindow} />}
        >
          <Typography variant="body2">Leave room</Typography>
        </MenuItem>
      </>
    );
  } else {
    displayName = user.displayName;
    subtitle = "USER";
    mainMenu = null;
  }

  return (
    <Flex>
      <Popup
        trigger={
          <Avatar
            src={user.avatar}
            alt={displayName}
            sx={{ cursor: "pointer" }}
          />
        }
      >
        <Flex as="ul" sx={{ flexDirection: "column", py: 3, width: "200px" }}>
          <MenuItem
            isSelectable={false}
            adornment={<Icon icon={extractProviderIcon(user?.provider)} />}
          >
            <Box>
              <EditableText
                editable={userType === "player"}
                onTextChange={onUserNameChange}
              >
                {displayName}
              </EditableText>
              <Typography variant="caption1" color="warningLight">
                ::{subtitle}::
              </Typography>
            </Box>
          </MenuItem>
          {mainMenu}
          <MenuItem
            hasSeparator
            adornment={<Icon icon={faArrowRightFromBracket} />}
            onClick={onLogout}
          >
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Flex>
      </Popup>
    </Flex>
  );
};
