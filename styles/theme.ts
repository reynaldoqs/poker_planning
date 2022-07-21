import type { Theme } from "theme-ui";

const makeTheme = <T extends Theme>(t: T) => t;

export const theme = makeTheme({
  breakpoints: ["480px", "768px", "1200px", "1440px"],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64],
  fonts: {
    body: "'Inter', sans-serif",
    heading: "inherit",
    monospace: "inherit",
  },
  fontSizes: [8, 10, 12, 14, 16, 20, 24, 32, 40, 48],
  lineHeights: ["1rem", "1.2rem", "1.4rem", "1.6rem", "1.8rem", "2rem"],
  borderWidths: [0, 1, 2, 4, 8, 10, 12],
  zIndices: [-1, 1, 2, 3, 4, 5],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  colors: {
    textLight: "#FFFFFF",
    text: "#D2D6E5",
    textDark: "#AFB3C3",
    backgroundLight: "#212431",
    background: "#141722",
    backgroundDark: "#0E1016",
    primary: "#5865f2",
    secondary: "#ff535f",
    accent: "#6EFDBF",
    info: "#2196F3",
    infoLight: "#8AB4F8",
    error: "#f2443e",
    errorLight: "#F09891",
    success: "#64F57A",
    successLight: "#81C995",
    warning: "#ecc04f",
    warningLight: "#FDD663",
    gold: "#FFBF00",
    black: "#010101",
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    gradient: {
      background: "linear-gradient(-70deg, #a2facf 0%, #64acff 100%)",
      backgroundClip: "text",
      textFillColor: "transparent",
      boxDecorationBreak: "clone",
      fontWeight: "bold",
    },
  },
  sizes: [
    8, 12, 18, 20, 24, 28, 32, 48, 58, 82, 108, 128, 152, 356, 420, 512, 768,
  ],
  radii: [6, 8, 10, 14, 28, 32, 44, 52],
  styles: {
    root: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
    },
  },
});

export type ExactTheme = typeof theme;

// export const theme = {
//   breakpoints: ["40em", "52em", "64em", "76em", "88em", "100em"],
//   space: [0, 4, 8, 12, 16, 28, 32, 64, 128, 256, 512, 768],
//   fonts: {
//     body: "'Inter', sans-serif",
//     heading: "inherit",
//     monospace: "inherit",
//   },
//   fontSizes: [10, 12, 14, 16, 18, 20, 24, 32, 42, 64, 96],
//   lineHeights: ["1rem", "1.2rem", "1.4rem", "1.6rem", "1.8rem", "2rem"],
//   borderWidths: [0, 1, 2, 4, 8, 10, 12],
//   zIndices: [-1, 1, 2, 3, 4, 5],
//   fontWeights: {
//     body: 400,
//     heading: 700,
//     bold: 700,
//   },

//   colors: {
//     textLight: "#FFFFFF",
//     text: "#D2D6E5",
//     textDark: "#AFB3C3",
//     textGreen: "#AEBEB1",
//     background: "#212431",
//     backgroundLight: "#353338", // will be removed
//     backgroundDark: "#141722",
//     backgroundDarker: "#0E1016", // will be removed
//     primary: "#5865f2",
//     secondary: "#ff535f",
//     muted: "#577870",
//     accent: "#F8514D",
//     info: "#2196F3",
//     error: "#f2443e",
//     success: "#64F57A",
//     warning: "#ecc04f",
//   },
//   text: {
//     heading: {
//       fontFamily: "heading",
//       lineHeight: "heading",
//       fontWeight: "heading",
//     },
//     gradient: {
//       background: "linear-gradient(-70deg, #a2facf 0%, #64acff 100%)",
//       backgroundClip: "text",
//       textFillColor: "transparent",
//       boxDecorationBreak: "clone",
//       fontWeight: "bold",
//     },
//   },
//   sizes: [
//     8, 12, 18, 20, 24, 28, 32, 48, 58, 82, 108, 128, 152, 356, 420, 512, 768,
//   ],
//   radii: [6, 8, 10, 14, 28, 32, 44, 52],
//   styles: {
//     root: {
//       fontFamily: "'Inter', sans-serif",
//       boxSizing: "border-box",
//       fontWeight: 400,
//     },
//   },
//   buttons: {
//     primary: {
//       borderRadius: 2,
//       display: "flex",
//       fontSize: 2,
//       fontFamily: "body",
//       fontWeight: "heading",
//       cursor: "pointer",
//       px: 5,
//       py: 3,
//       "&:active": {
//         opacity: 0.7,
//       },
//     },
//     outlined: {
//       backgroundColor: "transparent",
//       border: "2px solid",
//       borderColor: "primary",
//       color: "primary",
//       fontSize: 2,
//       borderRadius: 2,
//       px: 4,
//       cursor: "pointer",
//       "&:active": {
//         opacity: 0.7,
//       },
//     },
//     emoji: {
//       backgroundColor: "transparent",
//       m: 0,
//       p: 0,
//       cursor: "pointer",
//       "&:active": {
//         opacity: 0.7,
//       },
//     },
//     gradient: {
//       background: "linear-gradient(to bottom, #5865f2, #3c45a5)",
//       borderRadius: 3,
//       display: "flex",
//       fontSize: 3,
//       fontFamily: "body",
//       fontWeight: "heading",
//       cursor: "pointer",
//       px: 6,
//       py: 4,
//       "&:active": {
//         opacity: 0.7,
//       },
//     },
//   },
//   forms: {
//     input: {
//       border: "none",
//       "&:focus": {
//         outline: "none",
//       },
//     },
//     select: {
//       border: "none",
//       bg: "backgroundDarker",
//       "&:focus": {
//         outline: "none",
//       },
//     },
//     label: {
//       color: "textDark",
//     },
//   },
//   images: {
//     avatar: {
//       size: 8,
//       borderRadius: 0,
//     },
//   },
//   links: {
//     nav: {
//       cursor: "pointer",
//       textDecorationColor: "secondary",
//       color: "skyBlue",
//       fontSize: 3,
//     },
//   },
// };
