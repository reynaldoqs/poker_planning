import { Text } from "theme-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconProps } from "./Icon.types";

export const Icon: React.FC<IconProps> = ({ icon, ...rest }) => (
  <Text {...rest}>
    <FontAwesomeIcon icon={icon} />
  </Text>
);
