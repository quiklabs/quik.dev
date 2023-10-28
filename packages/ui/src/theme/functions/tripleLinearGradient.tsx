
function tripleLinearGradient(
    color: string,
    colorState: string,
    colorStateSecondary: string,
    angle: number = 310
) {
  if (angle === undefined) {
    angle = 310;
  }
  return `linear-gradient(${angle}deg, ${color}, ${colorState}, ${colorStateSecondary})`;
}

export default tripleLinearGradient;
