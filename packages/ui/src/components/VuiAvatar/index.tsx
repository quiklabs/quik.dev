import VuiAvatarRoot from "../VuiAvatar/VuiAvatarRoot";

import { forwardRef, ForwardedRef } from "react";

interface VuiAvatarProps {
  bgColor?: "transparent" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  shadow?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";
  [key: string]: any;
}

const VuiAvatar = forwardRef((props: VuiAvatarProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { bgColor = "transparent", size = "md", shadow = "none", ...rest } = props;

  return <VuiAvatarRoot ref={ref} ownerState={{ bgColor, size, shadow }} {...rest} />;
});

export default VuiAvatar;
