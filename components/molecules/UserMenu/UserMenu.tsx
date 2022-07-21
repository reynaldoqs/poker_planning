import { Box, Flex } from "theme-ui";
import {
  faArrowRightFromBracket,
  faPersonThroughWindow,
  faToggleOff,
  faToggleOn,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Avatar, Icon, MenuItem, Popup, Typography } from "~/components/atoms";

import { UserMenuProps } from "./UserMenu.types";
import { extractProviderIcon } from "~/utils";
import { EditableText } from "../EditableText";

export const UserMenu: React.FC<UserMenuProps> = ({
  user,
  onLogout,
  onUserNameChange,
}) => (
  <Flex>
    <Popup
      trigger={
        <Avatar
          src={user?.avatar}
          alt={user?.displayName}
          sx={{ cursor: "pointer" }}
        />
      }
    >
      <Flex as="ul" sx={{ flexDirection: "column", py: 3, width: "180px" }}>
        <MenuItem
          isSelectable={false}
          adornment={<Icon icon={extractProviderIcon(user?.provider)} />}
        >
          <Box>
            <EditableText editable onTextChange={onUserNameChange}>
              {user?.displayName}
            </EditableText>
            <Typography variant="caption1" color="warningLight">
              Observer
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem hasSeparator adornment={<Icon icon={faToggleOff} />}>
          <Typography variant="body2">Observer mode</Typography>
        </MenuItem>
        <MenuItem adornment={<Icon icon={faPenToSquare} />}>
          <Typography variant="body2">Edit room</Typography>
        </MenuItem>
        <MenuItem adornment={<Icon icon={faPersonThroughWindow} />}>
          <Typography variant="body2">Leave room</Typography>
        </MenuItem>
        <MenuItem
          hasSeparator
          adornment={<Icon icon={faArrowRightFromBracket} />}
          onClick={onLogout}
        >
          <Typography variant="body2">logout</Typography>
        </MenuItem>
      </Flex>
    </Popup>
  </Flex>
);
