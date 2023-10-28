import { IconProps } from '@mui/material';

import pxToRem from "../functions/pxToRem";

export default {
  defaultProps: {
    baseClassName: "material-icons-round",
    fontSize: "inherit",
  } as Partial<IconProps>,

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
