import { forwardRef, ForwardedRef } from "react";
import VuiSwitchRoot from "../VuiSwitch/VuiSwitchRoot";

interface VuiSwitchProps {
  color?: "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  size?: "small" | "medium" | "large";
}

const VuiSwitch: React.FC<VuiSwitchProps & { ref?: ForwardedRef<HTMLDivElement> }> = forwardRef(({ color = "white", size = "medium", ...rest }, ref) => (
    <VuiSwitchRoot {...rest} ref={ref} color="white" size={size} ownerState={{ color, size }} />
));

export default VuiSwitch;
