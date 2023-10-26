import { useState, ReactNode } from "react";

import Fade from "@mui/material/Fade";

import VuiBox from "../VuiBox";
import VuiAlertRoot from "../VuiAlert/VuiAlertRoot";
import VuiAlertCloseIcon from "../VuiAlert/VuiAlertCloseIcon";

interface VuiAlertProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  dismissible?: boolean;
  children: ReactNode;
  [key: string]: any;
}

type AlertStatus = "mount" | "fadeOut" | "unmount";

function VuiAlert({ color = "info", dismissible = false, children, ...rest }: VuiAlertProps) {
  const [alertStatus, setAlertStatus] = useState<AlertStatus>("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  const alertTemplate = (mount = true) => (
      <Fade in={mount} timeout={300}>
        <VuiAlertRoot ownerState={{ color }} {...rest}>
          <VuiBox display="flex" alignItems="center" color="white">
            {children}
          </VuiBox>
          {dismissible ? (
              <VuiAlertCloseIcon onClick={mount ? handleAlertStatus : undefined}>&times;</VuiAlertCloseIcon>
          ) : null}
        </VuiAlertRoot>
      </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      return alertTemplate();
  }

  return null;
}

export default VuiAlert;
