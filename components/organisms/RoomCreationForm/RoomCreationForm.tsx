import { Flex } from "theme-ui";
import { Input } from "~/components/molecules";
import { useTheme } from "~/hooks";
import type { RoomCreationFormProps } from "./RoomCreationForm.types";

export const RoomCreationForm: React.FC<RoomCreationFormProps> = () => {
  const theme = useTheme();
  //console.log("EL THEMA ES ASI", theme);
  return (
    <Flex
      sx={(data) => {
        console.log("DATA ==>", JSON.stringify(data.colors, null, 2));
        return { flexDirection: "column", padding: 3, bg: "warning" };
      }}
    >
      asd
      <Input label="audicito" />
      asdad
    </Flex>
  );
};
