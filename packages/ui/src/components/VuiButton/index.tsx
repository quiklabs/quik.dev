import React, { forwardRef, ReactNode } from 'react';
import VuiButtonRoot from '../VuiButton/VuiButtonRoot';

interface VuiButtonProps {
  color?: 'white' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'light' | 'dark' | 'text';
  variant?: 'text' | 'contained' | 'outlined' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  circular?: boolean;
  iconOnly?: boolean;
  children: ReactNode;
}

const VuiButton = forwardRef<HTMLButtonElement, VuiButtonProps>(
    ({ color = 'white', variant = 'contained', size = 'medium', circular = false, iconOnly = false, children, ...rest }, ref) => (
        <VuiButtonRoot
            {...rest}
            ref={ref}
            color="white"
            variant={variant === "gradient" ? "contained" : variant}
            size={size}
            ownerState={{ color, variant, size, circular, iconOnly }}
        >
          {children}
        </VuiButtonRoot>
    )
);

export default VuiButton;
