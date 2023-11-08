import GradientBorder from "./src/examples/GradientBorder";
import radialGradient from "./src/theme/functions/radialGradient";
import CoverLayout from "./src/common/CoverLayout";
import palette from "./src/theme/base/colors";
import borders from "./src/theme/base/borders";
import rgba from "./src/theme/functions/rgba";

export { default as VuiAlert } from "./src/components/VuiAlert";
export { default as VuiAvatar } from "./src/components/VuiAvatar";
export { default as VuiBadge } from "./src/components/VuiBadge";
export { default as VuiBox } from "./src/components/VuiBox";
export { default as VuiButton } from "./src/components/VuiButton";
export { default as VuiInput } from "./src/components/VuiInput";
export { default as VuiPagination } from "./src/components/VuiPagination";
export { default as VuiProgress } from "./src/components/VuiProgress";
export { default as VuiSwitch } from "./src/components/VuiSwitch";
export { default as VuiTypography } from "./src/components/VuiTypography";

export { default as theme } from "./src/theme";
export { default as themeRTL } from "./src/theme/theme-rtl";

export { ThemeProvider } from "@mui/material/styles";
export { default as CssBaseline } from "@mui/material/CssBaseline";

export { VisionUIControllerProvider } from "./src/context";

export { GradientBorder, radialGradient, CoverLayout, palette, borders, rgba };
