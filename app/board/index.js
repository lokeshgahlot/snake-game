export default (options) => {
  const constructor = ({boardEl, width, height}) => {
    boardEl.width = width;
    boardEl.height = height;
  }

  const draw = (state) => (color, rect) => {
    rect = rect || [0, 0, state.width, state.height];
    const {context} = state;
    context.beginPath();
    context.rect(...rect);
    context.fillStyle = color;
    context.fill();
  }

  let state = {
    ...options
  }
  const instance = Object.create({
    draw: draw(state),
    width: state.width,
    height: state.height,
  });
  constructor(state);
  return instance;
}
