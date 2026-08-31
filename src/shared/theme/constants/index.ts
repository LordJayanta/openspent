import * as dark from "@/shared/theme/constants/dark/index";
import * as light from "@/shared/theme/constants/light/index";

const themes = { dark, light } as const;

export default themes;

export const themeMap: { name: string; value: string }[] = Object.values(
  themes,
).map((theme) => ({
  name: theme.meta.name,
  value: theme.meta.themeId,
}));
