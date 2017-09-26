export default ({scale, length, speed, drawCell}) => {
  const constructor = (state) => () => {
    for (let i = 0; i < state.length; i++) {
      state.body.push({x: i, y:0});
    }
  }

  const move = (state) => () => {
    const head = state.body[state.body.length-1];
    const s = state.body.slice(1, state.body.length);
    s.push({
      x: head.x + state.xSpeed,
      y: head.y + state.ySpeed
    })
    state.body = s;
    return state.instance;
  }

  const draw = (state) => () => {
    for (let i = 0; i < state.body.length; i++) {
       drawCell(state.body[i].x, state.body[i].y);
    }
  }

  const dir = (state) => (x , y) => {
    state.xSpeed = x;
    state.ySpeed = y;
  }

  const eat = (state) => (x, y) => {
    const head = state.body[state.body.length-1];
    if (head.x === x && head.y === y) {
      state.body.push({x: (x + state.xSpeed) , y: (y + state.ySpeed)});
      return true;
    }
    return false;
  }

  const reset = (state) => () => {
    state.length = 5;
    state.body = [];
    state.xSpeed = 1;
    state.ySpeed = 0;
    for (let i = 0; i < state.length; i++) {
      state.body.push({x: i, y:0});
    }
  }

  const checkBobyCollision = (state) => () => {
    const body = state.body;
    const head = body[body.length-1];
    for (let i = 0; i < body.length-2; i++) {
      if (head.x === body[i].x && head.y === body[i].y) {
        return true;
      }
    }
    return false;
  }

  const getHead = (state) => () => {
    return state.body[state.body.length-1];
  }

  let state = {
    length: (length || 5),
    scale: (scale || 20),
    xSpeed: 1,
    ySpeed: 0,
    body: [],
    instance: null
  }

  constructor(state)();
  state.instance = Object.create({
    move: move(state),
    dir: dir(state),
    eat: eat(state),
    draw: draw(state),
    reset: reset(state),
    getHead: getHead(state),
    checkBobyCollision: checkBobyCollision(state)
  });

  return state.instance;
}
