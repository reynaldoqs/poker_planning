import { Image } from "theme-ui";

import { AvatarProps } from "./Avatar.types";

export const Avatar: React.FC<AvatarProps> = ({ src, alt, sx, ...rest }) => (
  <Image
    sx={{ size: 8, borderRadius: "50%", ...sx }}
    src={src}
    alt={alt}
    {...rest}
  />
);
