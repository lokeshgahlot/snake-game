export default (options) => {

  const draw = (state) => (row, col) => {
    state.drawCell(row, col);
  };

  let state = {
    ...options
  }

  const instance = Object.create({
    draw: draw(state)
  });
  return instance;
}
