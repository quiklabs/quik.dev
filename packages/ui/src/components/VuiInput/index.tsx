import React, { forwardRef, ReactNode } from 'react';
import VuiInputRoot from '../VuiInput/VuiInputRoot';
import VuiInputWithIconRoot from '../VuiInput/VuiInputWithIconRoot';
import VuiInputIconBoxRoot from '../VuiInput/VuiInputIconBoxRoot';
import VuiInputIconRoot from '../VuiInput/VuiInputIconRoot';
import { useVisionUIController } from '../../context';

interface VuiInputProps {
  size?: 'small' | 'medium' | 'large';
  icon?: {
    component: ReactNode | false;
    direction: 'none' | 'left' | 'right';
  };
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const VuiInput = forwardRef<HTMLInputElement, VuiInputProps>(
    ({ size = 'medium', icon = { component: false, direction: 'none' }, error = false, success = false, disabled = false, ...rest }, ref) => {
      let template;
      const [controller] = useVisionUIController();
      const { direction } = controller;
      const iconDirection = icon.direction;

      if (icon.component && icon.direction === 'left') {
        template = (
            <VuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
              <VuiInputIconBoxRoot ownerState={{ size }}>
                <VuiInputIconRoot fontSize="small" ownerState={{ size }}>
                  {icon.component}
                </VuiInputIconRoot>
              </VuiInputIconBoxRoot>
              <VuiInputRoot
                  {...rest}
                  ownerState={{ size, error, success, iconDirection, direction, disabled }}
              />
            </VuiInputWithIconRoot>
        );
      } else if (icon.component && icon.direction === 'right') {
        template = (
            <VuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
              <VuiInputRoot
                  {...rest}
                  ownerState={{ size, error, success, iconDirection, direction, disabled }}
              />
              <VuiInputIconBoxRoot ownerState={{ size }}>
                <VuiInputIconRoot fontSize="small" ownerState={{ size }}>
                  {icon.component}
                </VuiInputIconRoot>
              </VuiInputIconBoxRoot>
            </VuiInputWithIconRoot>
        );
      } else {
        template = <VuiInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />;
      }

      return template;
    }
);

export default VuiInput;
