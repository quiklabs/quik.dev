

// Vision UI Dashboard React helper functions
import hexToRgb from "../functions/hexToRgb";

function rgba(color, opacity) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
