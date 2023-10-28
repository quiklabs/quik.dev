
function radialGradient(color: string, colorState: string, angle: string = "69.43% 69.43% at 50% 50%") {
  if (angle === undefined) {
    angle = "69.43% 69.43% at 50% 50%";
  }
  return `radial-gradient(${angle}, ${color}, ${colorState})`;
}

export default radialGradient;
