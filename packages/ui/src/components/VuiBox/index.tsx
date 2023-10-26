import { forwardRef, ForwardedRef } from "react";

import VuiBoxRoot from "../VuiBox/VuiBoxRoot";

interface VuiBoxProps {
  variant?: "contained" | "gradient";
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  [key: string]: any;
}

const VuiBox = forwardRef<HTMLDivElement, VuiBoxProps>(
    ({
       variant = "contained",
       bgColor = "transparent",
       color = "dark",
       opacity = 1,
       borderRadius = "none",
       shadow = "none",
       ...rest
     }, ref) => (
        <VuiBoxRoot
            {...rest}
            ref={ref}
            ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow }}
        />
    )
);

export default VuiBox;
