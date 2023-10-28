import { AppBarProps } from '@mui/material';

export default {
  defaultProps: {
    color: "transparent",
  } as Partial<AppBarProps<"header", {}>>,

  styleOverrides: {
    root: {
      boxShadow: "none",
    },
  },
};
