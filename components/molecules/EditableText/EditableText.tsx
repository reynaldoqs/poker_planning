import { FormEvent, useEffect, useState, useRef } from "react";
import { Box, Flex } from "theme-ui";
import { faPen, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "~/components/atoms";
import { typographyVariants } from "~/components/atoms/Typography/Typography.types";

import { EditableTextProps } from "./EditableText.types";

export const EditableText: React.FC<EditableTextProps> = ({
  editable,
  textVariant = "body1",
  onTextChange,
  sx,
  children,
  ...rest
}) => {
  const [isEditable, setIsEditable] = useState<any>(false);
  const textRef = useRef<HTMLInputElement>(null);

  // const onchangeHandler = (event: FormEvent<HTMLDivElement>) => {
  //   onTextChange?.(event.currentTarget.textContent || "");

  //   textRef.current = event.currentTarget.textContent || ""
  // };

  const onSaveText = () => {
    setIsEditable(false);
    onTextChange?.(textRef?.current?.innerText || "");
  };

  useEffect(() => {
    if (isEditable) {
      //textRef?.current?.setSelectionRange(6, 6);
      textRef?.current?.focus();
    }
  }, [isEditable]);

  if (typeof children !== "string") return null;

  return (
    <Flex sx={{ position: "relative" }}>
      <Box
        ref={textRef}
        sx={{
          "&:focus": { outline: "none" },
          ...sx,
          ...typographyVariants[textVariant],
        }}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        // onInput={onchangeHandler}
        {...rest}
      >
        {children}
      </Box>
      {editable &&
        (!isEditable ? (
          <Icon
            onClick={() => setIsEditable(true)}
            icon={faPen}
            sx={{
              fontSize: 3,
              position: "absolute",
              right: "-26px",
              top: "4px",
              color: "textDark",
            }}
          />
        ) : (
          <Icon
            onClick={onSaveText}
            icon={faFloppyDisk}
            sx={{
              fontSize: 3,
              position: "absolute",
              right: "-26px",
              top: "4px",
              color: "textDark",
            }}
          />
        ))}
    </Flex>
  );
};
