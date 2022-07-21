import { TextProps } from "theme-ui";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type IconProps = TextProps & {
  as?: React.ElementType;
  icon: IconDefinition;
};
