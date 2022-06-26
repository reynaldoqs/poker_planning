import { useThemeUI } from "theme-ui";
import type { ThemeUIContextValue } from "theme-ui";

import type { ExactTheme } from "~/styles";

interface ExactContextValue extends Omit<ThemeUIContextValue, "theme"> {
  theme: ExactTheme;
}

export const useTheme = useThemeUI as unknown as () => ExactContextValue;
