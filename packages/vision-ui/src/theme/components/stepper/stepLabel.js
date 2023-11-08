

import typography from "../../base/typography";
import colors from "../../base/colors";

import pxToRem from "../../functions/pxToRem";

const { size, fontWeightRegular } = typography;
const { grey, dark, text } = colors;

export default {
  styleOverrides: {
    label: {
      marginTop: `${pxToRem(8)} !important`,
      fontWeight: fontWeightRegular,
      fontSize: size.md,
      color: grey[300],

      "&.Mui-active": {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${dark.main} !important`,
      },

      "&.Mui-completed": {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${text.main} !important`,
      },
    },
  },
};
