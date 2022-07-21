import type { TextProps } from "theme-ui";

import { ExactTheme } from "~/styles";

type Typographies =
  | "title"
  | "subtitle"
  | "heading1"
  | "heading2"
  | "body1"
  | "body2"
  | "button1"
  | "button2"
  | "caption1"
  | "caption2";

export const typographyVariants: Record<Typographies, TextProps["sx"]> = {
  title: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "42px",
    lineHeight: "48px",
  },
  subtitle: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "38px",
  },
  heading1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "30px",
  },
  heading2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "26px",
  },
  body1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "22px",
  },
  body2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
  },
  button1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "22px",
    letterSpacing: "0.05em",
  },
  button2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.05em",
  },
  caption1: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "20px",
  },
  caption2: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "16px",
  },
};

export type TypographyProps = TextProps & {
  as?: React.ElementType;
  variant?: Typographies;
  gradient?: boolean;
  color?: keyof ExactTheme["colors"];
};
