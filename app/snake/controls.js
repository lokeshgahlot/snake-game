
export default () => {
  const add = (state) => (snake) => {
    state.fn = handleArrowkeys(snake, 'left');
    document.addEventListener('keydown', state.fn);
  }

  const remove = (state) => () => {
    if(state.fn) {
        document.removeEventListener('keydown', state.fn);
    }
  }

  const handleArrowkeys = (snake, dir='left') => (e) => {
    switch(e.key) {
      case 'ArrowUp':
        if(dir !== 'down') {
          snake.dir(0, -1);
          dir = 'up';
        }
       break;
      case 'ArrowDown':
        if(dir !== 'up') {
          snake.dir(0, 1);
          dir = 'down';
        }
      break;
      case 'ArrowLeft':
        if(dir !== 'right') {
          snake.dir(-1, 0);
          dir = 'left';
        }
      break;
      case 'ArrowRight':
        if(dir !== 'left') {
          snake.dir(1, 0);
          dir = 'right';
        }
      break;
    }
  }

  let state = {
    fn: null
  };

  return {
    add: add(state),
    remove: remove(state)
  }
}
