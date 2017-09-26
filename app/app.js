import './app.scss';
import Snake from './snake';
import Board from './board';
import Food  from './food';
import CONSTANTS from './constants';
import showModal  from './modal';
import {drawCell, getClientWidth, getClientHeight, getRandomPos} from './utils';

const BOARD_COLOR = 'papayawhip';
const SCALE = 20;
const FRAMES_PER_SECOND = 15;

const App = () => {
  const boardEl = document.querySelector('.board');
  const playBtnEl = document.querySelector('.btn');
  const scoreEl = document.querySelector('.score');
  const ctx = boardEl.getContext("2d");
  const board = setupBoard(boardEl, ctx);
  const totalRow = board.width / SCALE;
  const totalColumn = board.height / SCALE;
  const snake = Snake({ drawCell: drawCell(ctx, 'blue', SCALE)});
  const food = Food({ drawCell: drawCell(ctx, 'tomato', SCALE)});
  let score = 0, interval = 1000/FRAMES_PER_SECOND;
  let boardPosition, timerId;

  const run = () => {
    board.draw(BOARD_COLOR);
    snake.move().draw();
    const {x, y} = snake.getHead();
    if (x < 0 || x >= totalRow || y < 0 || y >= totalColumn || snake.checkBobyCollision()) {
      clearTimeout(timerId);
      stop();
      return;
    }
    if (snake.eat(...boardPosition)) {
      boardPosition = getRandomPos(totalRow, totalColumn);
      score += 5;
      scoreEl.innerHTML = 'Score: ' + score;
    }
    food.draw(...boardPosition);
    timerId = setTimeout(run, interval);
  }

  const start = () => {
    playBtnEl.innerHTML = 'Play Again';
    score = 0;
    snake.reset();
    clearTimeout(timerId);
    document.addEventListener('keydown', handleArrowkeys(snake, 'left'));
    boardPosition = getRandomPos(totalRow, totalColumn);
    run();
  }

  const stop = () => {
    showModal({
      header: CONSTANTS.headerMsg,
      msg: CONSTANTS.gameOverMsg,
      btnLabel: CONSTANTS.playAgainLabel}
    ).then(start);
  }



  board.draw(BOARD_COLOR);
  snake.draw();
  playBtnEl.addEventListener('click', start);
  boardEl.focus();
  showModal({
    header: CONSTANTS.headerMsg,
    msg: CONSTANTS.welcomeMsg,
    btnLabel: CONSTANTS.playLabel}
  ).then(start);
}

const setupBoard = (boardEl, ctx) => {
  const clientWidth = getClientWidth();
  const clientHeight = getClientHeight();

  const width = Math.floor(clientWidth/SCALE)*SCALE;
  const height = Math.floor((clientHeight)/SCALE)*SCALE;
  return Board({
    boardEl: boardEl, context: ctx,
    width: (width-SCALE), height: (height-(2*SCALE))});
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
App();
