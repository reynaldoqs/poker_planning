import P from "reactjs-popup";
import { Box } from "theme-ui";
import { theme } from "~/styles";

import { PopupProps } from "./Popup.types";

export const Popup: React.FC<PopupProps> = ({ trigger, children }) => (
  <P
    trigger={<div>{trigger}</div>}
    on="click"
    closeOnDocumentClick
    mouseLeaveDelay={300}
    mouseEnterDelay={0}
    position="bottom right"
    arrowStyle={{ color: theme.colors.backgroundLight }}
  >
    <Box sx={{ bg: "backgroundLight", borderRadius: 3 }}>{children}</Box>
  </P>
);
