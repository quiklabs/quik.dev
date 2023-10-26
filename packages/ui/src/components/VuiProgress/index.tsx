import { forwardRef, ForwardedRef } from "react";
import VuiTypography from "../VuiTypography";
import VuiProgressRoot from "../VuiProgress/VuiProgressRoot";

interface VuiProgressProps {
  variant?: "contained" | "gradient" | "outlined" | "text" | "button" | "body";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text";
  fontWeight?: "light" | "regular" | "medium" | "bold" | false;
  value?: number;
  label?: boolean;
}

const VuiProgress: React.FC<VuiProgressProps & { ref?: ForwardedRef<HTMLDivElement> }> = forwardRef(
    ({ variant = "contained", color = "info", value = 0, label = false, ...rest }, ref) => (
        <>
          {label && (
              <VuiTypography variant="button" fontWeight="medium" color="text">
                {value}%
              </VuiTypography>
          )}
          <VuiProgressRoot
              {...rest}
              ref={ref}
              variant="determinate"
              value={value}
              ownerState={{ color, value, variant }}
          />
        </>
    )
);

export default VuiProgress;
