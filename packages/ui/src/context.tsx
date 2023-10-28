import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";

interface State {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: "ltr" | "rtl";
  layout: string;
}

type Action =
    | { type: "MINI_SIDENAV"; value: boolean }
    | { type: "TRANSPARENT_SIDENAV"; value: boolean }
    | { type: "SIDENAV_COLOR"; value: string }
    | { type: "TRANSPARENT_NAVBAR"; value: boolean }
    | { type: "FIXED_NAVBAR"; value: boolean }
    | { type: "OPEN_CONFIGURATOR"; value: boolean }
    | { type: "DIRECTION"; value: "ltr" | "rtl" }
    | { type: "LAYOUT"; value: string };

interface VisionUIControllerProviderProps {
  children: ReactNode;
}

const VisionUI = createContext<[State, Dispatch<Action>] | undefined>(undefined);

// Setting custom name for the context which is visible on react dev tools
VisionUI.displayName = "VisionUIContext";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function VisionUIControllerProvider({ children }: VisionUIControllerProviderProps) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <VisionUI.Provider value={[controller, dispatch]}>{children}</VisionUI.Provider>;
}

function useVisionUIController(): [State, Dispatch<Action>] {
  const context = useContext(VisionUI) as [State, Dispatch<Action>] | undefined;

  if (!context) {
    throw new Error("useVisionUIController should be used inside the VisionUIControllerProvider.");
  }

  return context;
}

// Context module functions
const setMiniSidenav = (dispatch: Dispatch<Action>, value: boolean) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch: Dispatch<Action>, value: boolean) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch: Dispatch<Action>, value: string) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch: Dispatch<Action>, value: boolean) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch: Dispatch<Action>, value: boolean) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch: Dispatch<Action>, value: boolean) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch: Dispatch<Action>, value: "ltr" | "rtl") => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch: Dispatch<Action>, value: string) => dispatch({ type: "LAYOUT", value });

export {
  VisionUIControllerProvider,
  useVisionUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
};
