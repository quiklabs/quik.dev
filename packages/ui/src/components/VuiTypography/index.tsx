import React, { forwardRef, ReactNode } from "react";
import VuiTypographyRoot from "../VuiTypography/VuiTypographyRoot";

interface VuiTypographyProps {
    color?: "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text" | "white" | "logo";
    fontWeight?: false | "light" | "regular" | "medium" | "bold";
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
    verticalAlign?: "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";
    fontSize?: string;
    textGradient?: boolean;
    opacity?: number;
    children: ReactNode;
}

const VuiTypography = forwardRef<HTMLDivElement, VuiTypographyProps>(
    (
        {
            color = "dark",
            fontWeight = false,
            fontSize = "16px",
            textTransform = "none",
            verticalAlign = "unset",
            textGradient = false,
            opacity = 1,
            children,
            ...rest
        },
        ref
    ) => (
        <VuiTypographyRoot
            {...rest}
            ref={ref}
            ownerState={{
                color,
                textTransform,
                verticalAlign,
                fontSize,
                fontWeight,
                opacity,
                textGradient,
            }}
        >
            {children}
        </VuiTypographyRoot>
    )
);

export default VuiTypography;
