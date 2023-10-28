import { SvgIconProps } from '@mui/material';

import pxToRem from "../functions/pxToRem";

export default {
  defaultProps: {
    fontSize: "inherit",
  } as Partial<SvgIconProps>,

  styleOverrides: {
    fontSizeInherit: {
      fontSize: "inherit !important",
    },

    fontSizeSmall: {
      fontSize: `${pxToRem(20)} !important`,
    },

    fontSizeLarge: {
      fontSize: `${pxToRem(36)} !important`,
    },
  },
};
