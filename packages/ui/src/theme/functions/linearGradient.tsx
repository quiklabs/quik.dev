
function linearGradient(color: string, colorState: string, angle: number = 310) {
  if (angle === undefined) {
    angle = 310;
  }
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export default linearGradient;
