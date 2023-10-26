import VuiBadgeRoot from "../VuiBadge/VuiBadgeRoot";

import { forwardRef, ReactNode, ForwardedRef } from "react";

interface VuiBadgeProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  variant?: "gradient" | "contained" | "standard";
  size?: "xs" | "sm" | "md" | "lg";
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  container?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const VuiBadge = forwardRef((props: VuiBadgeProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    color = "info",
    variant = "gradient",
    size = "sm",
    circular = false,
    indicator = false,
    border = false,
    container = false,
    children,
    ...rest
  } = props;

  return (
      <VuiBadgeRoot
          {...rest}
          ownerState={{ color, variant, size, circular, indicator, border, container, children }}
          ref={ref}
          color="default"
      >
        {children}
      </VuiBadgeRoot>
  );
});

export default VuiBadge;
