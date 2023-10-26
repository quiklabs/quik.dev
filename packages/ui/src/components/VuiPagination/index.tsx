import { forwardRef, createContext, useContext, ReactNode } from "react";
import VuiBox from "../VuiBox";
import VuiPaginationItemRoot from "../VuiPagination/VuiPaginationItemRoot";

interface PaginationContextType {
  variant: "gradient" | "contained";
  color: "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  size: "small" | "medium" | "large";
}

const Context = createContext<PaginationContextType | null>(null);

interface VuiPaginationProps {
  item?: boolean;
  variant?: "gradient" | "contained";
  color?: "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  size?: "small" | "medium" | "large";
  active?: boolean;
  children: ReactNode;
  // ... any other props if needed
}

const VuiPagination = forwardRef<HTMLDivElement, VuiPaginationProps>(
    ({ item = false, variant = "gradient", color = "info", size = "medium", active = false, children, ...rest }, ref) => {
      const context = item ? useContext(Context) : null;

      return (
          <Context.Provider value={{ variant, color, size }}>
            {item ? (
                <VuiPaginationItemRoot
                    {...rest}
                    ref={ref}
                    variant={active ? context?.variant ?? "outlined" : "outlined"}
                    color={active ? context?.color ?? "text" : "text"}
                    iconOnly
                    circular
                    ownerState={{ variant, active, size }}
                >
                  {children}
                </VuiPaginationItemRoot>
            ) : (
                <VuiBox
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ listStyle: "none" }}
                >
                  {children}
                </VuiBox>
            )}
          </Context.Provider>
      );
    }
);

export default VuiPagination;
