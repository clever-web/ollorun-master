import { pxToRem, responsiveFontSizes } from "../utils/getFontValue";

// ----------------------------------------------------------------------

// const FONT_PRIMARY = "Montserrat"; // Local Font
const FONT_SECONDARY = 'Poppins-Regular'; // Local Font

const typography = {
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 600,
    lineHeight: 80 / 64,
    fontSize: pxToRem(35),
    letterSpacing: 2,
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 76 }),
  },
  h2: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 48, lg: 56 }),
  },
  h3: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 34 }),
  },
  h4: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({sm: 20, md: 24, lg: 29 }),
  },
  h5: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 24 }),
  },
  h6: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  p: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 400,
    fontSize: pxToRem(20),
  },
  a: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 400,
  },
  span: {
    fontFamily: FONT_SECONDARY,
  },
  subtitle1: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    color: "#BACECE",
  },
  body2: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    color: "#000",
  },
  caption: {
    fontFamily: FONT_SECONDARY,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontFamily: FONT_SECONDARY,
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
};

export default typography;
